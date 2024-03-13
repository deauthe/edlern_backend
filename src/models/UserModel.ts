import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	age: number;
	interestField:
		| "Academics Education"
		| "Competitive Examination"
		| "IT &amp; Software"
		| "Entrepreneurship"
		| "Personal Development"
		| "Career Counselling"
		| "Lifestyle"
		| "Health and Wellness"
		| "Law and Legal Studies"
		| "Sports and Recreation"
		| "Finance"
		| "Design"
		| "Other";
	fieldExplanation?: string;
}

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "please enter name"],
		},
		email: {
			type: String,
			unique: [true, "this email is already registered"],
			validate: validator.isEmail,
		},
		phonePrefix: {
			type: String,
			default: "+91",
		},
		phone: {
			type: String,
			required: [true, "please provide a mobile number"],
		},
		dob: {
			type: Date,
			required: [true, "Please enter Date of birth"],
		},
		interestField: {
			type: String,
			enum: [
				"Academics Education",
				"Competitive Examination",
				"IT &amp; Software",
				"Entrepreneurship",
				"Personal Development",
				"Career Counselling",
				"Lifestyle",
				"Health and Wellness",
				"Law and Legal Studies",
				"Sports and Recreation",
				"Finance",
				"Design",
				"Other",
			],

			required: [true, "please provide an interest field"],
		},
		fieldExplanation: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

schema.virtual("age").get(function () {
	const today = new Date();
	const dob: Date = this.dob;
	let age: number = today.getFullYear() - dob.getFullYear();

	if (
		today.getMonth() < dob.getMonth() ||
		(today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
	) {
		age--;
	}

	return age;
});

export const User = mongoose.model<IUser>("User", schema);
