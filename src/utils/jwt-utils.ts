import jwt from "jsonwebtoken";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAoyPFAhQ2rTMPCrQM7qHU
zr1O7guIswI3ECCdLdKvfER8phOQXCmibqWIget2h0sySRIHF80aq2EGFtxyxp3o
IBhUYllhGTg+OeL4+T7OdtHVWta+1v7NIdInCaFdiNR8tuC3CYeuEm3VQTGDcpJ5
nolnO48S//vedFaV2BgBc/XcTJUqNjbT9lgoANBGEP7LsmWdTDPprO9cAeadwl1I
ra9uMP3wG/kZ0AXSPycjBBJhVYtEmUJN1asb1d8UoidIDu5Hjgd1EMILNXhNh+E9
xGD16x56MoOBnb2GQzpDKKd27zz/Caqg7dX1UwTOA6u/FOGI18IZd3LDtF12Y92z
Fu8MQ6I3kQOgyY/CgIBfv9/XJFrBt17u+LLCrwTliIQtxX7HeLZ8amQzy61fkTVg
vOtzZGQZLvpF51ZOgrC/p9YkBRQRfMSpGgdTwdmasOE5RWJ/bSKGCZYQy5CUA06d
33POVDrofhZ+TD8Q5PQ9DQvcVPkTHMCcyhHrcsNVAfdqihe8Zx2L3rDraGbZi2FB
sPz8RY01v7NCrJ/76TaxdOzYuKEJgVy+KqV2ywcTY4QC2QqVFofF2Mr5cl3pi1aR
oJ38S3ZUcagD2LJP7C8u48sRumdTqzt6Akt1fZ1J/vg7AaJoWnDqAhfeLuelHulR
v4iNdW7GWgUFG6PDlrNSjy0CAwEAAQ==
-----END PUBLIC KEY-----`;

//sign jwt
export const signJWT = (payload: object, expiresIn: number | string) => {
	return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
		algorithm: "RS256",
		expiresIn,
	});
};

export const verifyJWT = (token: string) => {
	try {
		const decoded = jwt.verify(token, publicKey);
		return { payload: decoded, expired: false };
	} catch (e) {
		return { payload: null, expired: e.message.include("jwt-expired") };
	}
};

export const sessions: Record<
	string,
	{ sessionId: string; email: string; valid: boolean }
> = {};

export const createSession = (email: string, name: string) => {
	const sessionId = String(Object.keys(sessions).length + 1);

	const session = { sessionId, email, valid: true, name };

	sessions[sessionId] = session;

	return session;
};

export function invalidateSession(sessionId: string) {
	const session = sessions[sessionId];

	if (session) {
		sessions[sessionId].valid = false;
	}

	return sessions[sessionId];
}
