import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppErrors";
import { verifyAccessToken } from "../lib/jwt";

export function authenticate(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        next(new AppError(401, "Access Token is required"));
        return;
    }
    const accessToken = authHeader?.split(" ")[1];

    req.user = verifyAccessToken(accessToken);

    next();
}
