import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthMiddleware {

    public static async userMiddleware(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["auth-token"];

        if (!token || typeof token !== "string") {
            res.status(401).send("Unauthorized");
            return;
        }

        // @todo auth

        next();
    }
}

export default AuthMiddleware;
