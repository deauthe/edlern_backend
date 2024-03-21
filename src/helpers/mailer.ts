import nodeMailer, { TransportOptions } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import { text } from "stream/consumers";

const transporter = nodeMailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
});

export const sendMail = async ({
	recieverEmail,
}: {
	recieverEmail: string;
}) => {
	const mailOptions: MailOptions = {
		from: {
			name: "Edlern Support",
			address: process.env.MAIL_USER!,
		},
		to: [recieverEmail],
		subject: "Edlern Support",
		text: "Hello world",
		html: "<b>hahahahahahahah</b>",
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error(error);
	}
};
