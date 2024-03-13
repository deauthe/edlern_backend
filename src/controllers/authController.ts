import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error";
import { User } from "../types/userTypes";
import { createSession, signJWT, verifyJWT } from "../utils/jwt-utils";
import { getUser } from "../utils/userUtil";
import ErrorHandler from "../utils/utility-class";

export const createSessionHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new ErrorHandler("please fill all fields", 400));
	}

	const user = await getUser(email);

	if (!user || user.password !== password) {
		//@ts-ignore
		return res.status(401).send("invalid email or password");
	}

	const session = createSession(email, user.name);

	//create access token
	//@ts-ignore
	const accessToken = signJWT(
		{ email: user.email, name: user.name, sessionId: session.sessionId },
		"5s"
	);
	const refreshToken = signJWT({ email: user.email, name: user.name }, "1y");

	res.cookie("accessToken", accessToken, {
		maxAge: 300000, //5min
		httpOnly: true, //js won't be able to access the cookie only http
	});

	res.cookie("refreshToken", refreshToken, {
		maxAge: 3.154e10, //1year,
		httpOnly: true,
	});

	//send user back
	return res.send(session);
};

export const getSessionHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// @ts-ignore
	res.send(req.user);
};

export const deleteSessionHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.cookie("accessToken", "", {
		maxAge: 0,
		httpOnly: true,
	});

	res.send({ success: true, message: "logged out user" });
};
