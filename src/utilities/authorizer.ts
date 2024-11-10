import { Request } from "express";

// import Json Web Token to use it for authorization by Token
import { verify, JwtPayload } from "jsonwebtoken";

// build up a function that authoriz Requests
function Authorize(req: Request, user_id: number | null = null) {
	const authorizationHeader = req.headers.authorization;
	const token = authorizationHeader?.split(" ")[1];
	const decoded = verify(token as string, process.env.TOKEN_SECRET as string) as JwtPayload;
	if (user_id && decoded.user.id !== user_id) {
		throw new Error("User id doesn't match");
	}
}

export default Authorize;