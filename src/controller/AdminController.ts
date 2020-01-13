import { Request, Response } from "express";
import MysqlDatabase from "../database/mysql/MysqlDatabase";
import Url from "../model/Url";

class AdminController {

    public static async getUrls(req: Request, res: Response) {

        const db = new MysqlDatabase();

        const urls = await db.getAll();

        res.status(200).json(urls);
        return;
    }

    public static async getUrl(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(404).send("No short url found");
            return;
        }

        const db = new MysqlDatabase();

        const url = await db.getUrlPairById(parseInt(id, 10));

        if (!url) {
            res.status(404).send("No short url found");
            return;
        }

        res.status(200).json(url);
        return;
    }

    public static async createShortUrl(req: Request, res: Response) {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            res.status(400).send("Not good");
            return;
        }

        const db = new MysqlDatabase();

        let uniqueUrl = false;
        let shortUrl = "";

        while (!uniqueUrl) {
            shortUrl = Url.generateShortUrl();
            const response = await db.getUrlPairByShortUrl(shortUrl);

            if (!response || response.shortUrl !== shortUrl) {
                uniqueUrl = true;
            }
        }

        const dbUrl = await db.getUrlPairByOriginalUrl(originalUrl);

        if (dbUrl) {
            res.status(201).json(dbUrl.id);
            return;
        }

        const lastInsertId = await db.addUrlPair(originalUrl, shortUrl);

        res.status(201).json(lastInsertId);
    }

    public static async removeShortUrl(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(404).send("No url found");
            return;
        }

        const db = new MysqlDatabase();

        const urlPair = await db.getUrlPairById(parseInt(id, 10));

        if (urlPair) {
            const response = await db.removeUrl(parseInt(id, 10));
            res.status(200).send();
            return;
        }

        res.status(404).send("No url found");
        return;
    }

}

export default AdminController;
