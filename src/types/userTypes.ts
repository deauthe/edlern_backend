import * as z from "zod";

const getUserParams = z.object({
	email: z.string().email(),
});

export type GetUserParamsType = z.infer<typeof getUserParams>;

export type User = {
	email: string;
	password: string;
};
