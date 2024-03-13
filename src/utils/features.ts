import { error, log } from "console";
import mongoose from "mongoose";

export const connectDB = (uri: string) => {
	mongoose
		.connect(uri, {
			dbName: "edlern",
		})
		.then((c) => {
			console.log("db connected to ", c.connection.host);
		})
		.catch((error) => console.log(error));
};
