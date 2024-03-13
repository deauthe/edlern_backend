import express, { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/general.js";

export const globalErrorHandler = (
	err: ErrorHandler,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	console.log("global error handler working");
	err.message = err.message || "Internal server error";
	err.statusCode = err.statusCode || 500;
	// console.log(err);
	//@ts-ignore
	if (err.code === 11000) {
		return res
			.status(11000)
			.json({ message: "duplicate key error", short: "duplicate key" });
	}
	return res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

/* this is so that we dont have to type the controllers
    with a try catch block everyTime
    instead we will just wrap the body of the function(only the inside of the try block)
    inside a function that takes in the controllerType, 
    passes wtv there is in the next(#here#) to the catch below*/

export const TryCatch =
	(func: ControllerType) =>
	(req: Request, res: Response, next: NextFunction) => {
		const result = Promise.resolve(func(req, res, next)).catch(next);

		return result;
	};
