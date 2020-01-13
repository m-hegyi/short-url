import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import MysqlDatabase from "../database/mysql/MysqlDatabase";

class AuthController {

    public static async login(req: Request, res: Response) {
        const { name, password } = req.body;

        if (!name || !password) {
            res.status(400).send("Invalid data");
            return;
        }

        const db = new MysqlDatabase();

        const user = await db.getUser(name);

        if (!user) {
            res.status(400).send("Invalid dataa");
            return;
        }

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) {
            res.status(400).send("Invalid sdata");
            return;
        }

        const { TOKEN_SECRET } = process.env;

        if (!TOKEN_SECRET) {
            res.status(500).send("Internal server error");
            return;
        }

        const token = jwt.sign(JSON.stringify({ _id: user.id }), TOKEN_SECRET);

        res.header("Auth-Token", token);
        res.status(200).send("ok");
        return;
    }

}

export default AuthController;
