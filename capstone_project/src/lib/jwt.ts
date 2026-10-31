import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../errors/AppErrors";
import { TokenPayload } from "../types/user";

export function signAccessToken(payload: TokenPayload): string {
    const options: SignOptions = {
        expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, env.jwtAccessSecret, options);
}

export function verifyAccessToken(token: string): TokenPayload {
    try {
        return jwt.verify(token, env.jwtAccessSecret) as TokenPayload;
    } catch {
        throw new AppError(401, "invalid or expired access token");
    }
}
