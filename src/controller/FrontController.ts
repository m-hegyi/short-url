import { Request, Response } from "express";
import IDatabase from "../interface/IDatabase";
import Url from "../model/Url";

class FrontController {

    public static async redirectByShortUrl(req: Request, res: Response) {
        const { encryptedId } = req.params;

        if (!encryptedId) {
            res.status(404).send("No route found");
            return;
        }

        if (!Url.isValidEncryptedId(encryptedId)) {
            res.status(401).send("Invalid url");
            return;
        }

        res.send(encryptedId);

        return;

        // Database connnection

        // Database get
        const date = new Date();
        const url = new Url({
            createdAt: date,
            id: 1,
            longUrl: "https://google.com",
            shortUrl: "12a",
        });

        res.redirect(url.getLongUrl());
    }

}

export default FrontController;
