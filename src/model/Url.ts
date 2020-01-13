import shortid from "shortid";

import IUrl from "../interface/IUrl";

class Url {

    public static generateShortUrl(): string {
        return shortid.generate();
    }

    public static isValidEncryptedId(encrytedId: string): boolean {
        return shortid.isValid(encrytedId) ? true : false;
    }

    protected id!: number;

    protected originalUrl!: string;

    protected shortUrl!: string;

    protected createdAt?: Date;

    public constructor({id, originalUrl, shortUrl, createdAt}: IUrl) {
        this.id = id;
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.createdAt = createdAt;
    }

    public getOriginalUrl(): string {
        return this.originalUrl;
    }

    public getShortUrl(): string {
        return this.shortUrl;
    }

    public getId(): number {
        return this.id;
    }

    public getCreatedAt(): Date|undefined {
        return this.createdAt;
    }
}

export default Url;
