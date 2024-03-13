import { User } from "../models/UserModel";

export const getUser = async (email) => {
	const user = await User.findOne({ email: email });
	if (!user) {
		return null;
	} else {
		return user;
	}
};
