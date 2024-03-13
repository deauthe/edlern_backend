import jwt from "jsonwebtoken";
import { TryCatch } from "./error";
import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt-utils";

/**
 * NOTE: This middleware for decoding JWT is not necessary when using Passport's JWT strategy.
 * Passport handles token decoding and user extraction automatically.
 */

export const decodeToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	const token = authHeader!.split(" ")[1];

	const decoded = jwt.verify(token, process.env.JWT_SECRET!);
	//@ts-ignore
	req.userId = decoded.id;
	next();

	res.status(401).json({ message: "Unauthorized" });
};

export const deserializeUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { accessToken } = req.cookies;
	if (!accessToken) {
		return next();
	}

	const { payload } = verifyJWT(accessToken);

	if (payload) {
		// @ts-ignore
		req.user = payload;
		return next();
	}
	return next();
};

export const requireUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//@ts-ignore
	if (!req.user) {
		return res.status(403).send("invalid session");
	}
	return next();
};
