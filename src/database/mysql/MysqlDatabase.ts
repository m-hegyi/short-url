import mysql from "mysql";
import IDatabase from "../../interface/IDatabase";
import IUrl from "../../interface/IUrl";

class MysqlDatabase implements IDatabase {

    private connected!: boolean;

    private host!: string;

    private user!: string;

    private password!: string;

    private database!: string;

    private connection!: mysql.Connection;

    public constructor() {
        const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

        if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
            return;
        }

        this.host       = DB_HOST;
        this.user       = DB_USER;
        this.password   = DB_PASS;
        this.database   = DB_NAME;

        this.connected  = false;
    }

    public async connect(): Promise<void> {
        const { host, user, password, database } = this;

        try {
            const connection = await mysql.createConnection({host, user, password, database});

            this.connection = connection;
        } catch (err) {
            throw new Error("error happend");
        }

        return;
    }
    public disconnect() {
        return;
    }
    public async getAll(): Promise<IUrl[]> {

        if (!this.connection) {
            await this.connect();
        }

        return new Promise((resolve, reject) => {

            this.connection.query("SELECT * FROM short_urls WHERE is_deleted=0", (error, results: IUrl[], fields) => {
                resolve(results);
            })

        })

    }
    public async getUrlPairById(id: number): Promise<IUrl|null> {
        if (!this.connection) {
            await this.connect();
        }

        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT * FROM short_urls WHERE id=? AND is_deleted = 0 ",
                [id],
                (error, results: IUrl[]) => {
                    if (results.length > 0) {
                        resolve(results[0]);
                    }

                    resolve();
                }
            )
        })
    }
    public async getUrlPairByShortUrl(shortUrl: string): Promise<IUrl|null> {
        if (!this.connection) {
            await this.connect();
        }

        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT * FROM short_urls WHERE short_url=? AND is_deleted = 0 ",
                [shortUrl],
                (error, results: IUrl[]) => {
                    if (results.length > 0) {
                        resolve(results[0]);
                    }

                    if (error) {
                        reject(error);
                    }

                    resolve();
            });
        });
    }

    public async getUrlPairByOriginalUrl(originalUrl: string): Promise<IUrl|null> {
        if (!this.connection) {
            await this.connect();
        }

        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT * FROM short_urls WHERE original_url=? AND is_deleted = 0 ",
                [originalUrl],
                (error, results: IUrl[]) => {

                    if (results.length > 0) {
                        resolve(results[0]);
                    }

                    if (error) {
                        reject(error);
                    }

                    resolve();
                });
        });
    }

    public async getUser(name: string): Promise<IUser|null> {
        if (!this.connection) {
            await this.connect();
        }

        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT * FROM users WHERE name LIKE ?",
                [name],
                (error, result: IUser[]) => {
                    if (result.length > 0) {
                        resolve(result[0]);
                    }

                    resolve();
            });
        });
    }

    public async addUrlPair(originalUrl: string, shortUrl: string): Promise<number> {
        if (!this.connection) {
            await this.connect();
        }

        return new Promise((resolve, reject) => {
            this.connection.query(
                "INSERT INTO short_urls SET original_url=?, short_url=?",
                [originalUrl, shortUrl],
                (error, result) => {
                    resolve(result.insertId);
            });
        });
    }
    public async removeUrl(id: number): Promise<boolean> {
        if (!this.connection) {
            await this.connect();
        }

        return new Promise((resolve, reject) => {
            this.connection.query(
                "UPDATE short_urls SET is_deleted=1 WHERE id=?",
                [id],
                (error, result) => {
                    resolve(true);

            });
        });
    }

}

export default MysqlDatabase;
