import { GetUserParamsType } from "../types/userTypes";
import { User } from "../models/UserModel";
import { Response, Request, NextFunction } from "express";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/utility-class";
import { log } from "console";

export const updateUser = async () => {};
export const createUserHandler = TryCatch(
	async (req: Request, res: Response, next: NextFunction) => {
		let {
			name,
			email,
			phone,
			dob,
			interestField,
			fieldExplanation,
			phonePrefix,
		} = req.body;
		if (!name || !email || !phone || !dob || !interestField) {
			return next(new ErrorHandler("please send all fields", 400));
		}
		if (!fieldExplanation) {
			fieldExplanation = "";
		}
		if (!phonePrefix) {
			phonePrefix = "";
		}
		console.log("working");
		const existingUser = await User.findOne({
			email,
		});
		if (existingUser) {
			console.error("existing user:", existingUser);

			return next(new ErrorHandler("user already exists", 400));
		}
		const newUser = await User.create({
			name,
			email,
			phone,
			dob,
			interestField,
			fieldExplanation,
			phonePrefix,
		});

		if (!newUser) {
			return next(new ErrorHandler("error creating user", 400));
		}
		console.log(!newUser);
		res.send({
			success: true,
			message: "user created successfully",
			user: newUser,
		});
	}
);

export const getUser = TryCatch(
	async (req: Request, res: Response, next: NextFunction) => {
		let {
			name,
			email,
			phone,
			dob,
			interestField,
			fieldExplanation,
			phonePrefix,
		} = req.body;
		if (!name || !email || !phone || !dob || !interestField) {
			return next(new ErrorHandler("please send all fields", 400));
		}
		if (!fieldExplanation) {
			fieldExplanation = "";
		}
		if (!phonePrefix) {
			phonePrefix = "";
		}
		console.log("working");
		const newUser = await User.create({
			name,
			email,
			phone,
			dob,
			interestField,
			fieldExplanation,
			phonePrefix,
		});

		if (!newUser) {
			return next(new ErrorHandler("error creating user", 400));
		}
		console.log(!newUser);
		res.send({
			success: true,
			message: "user created successfully",
			user: newUser,
		});
	}
);
