import nodeMailer from "nodemailer";
import { text } from "stream/consumers";

export const sendMail = ({ recieverEmail }: { recieverEmail: string }) => {
	const mailOptions = {
		from: {
			name: "Edlern Support",
			address: process.env.MAIL_USER,
		},
		to: [recieverEmail],
		subject: "edlern_mail",
		text: "Hello world",
		html: "<b>hahahahahahahah</b>",
	};
	nodeMailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD,
		},
	});
};
