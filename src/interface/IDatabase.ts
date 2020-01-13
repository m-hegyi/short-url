import IUrl from "./IUrl";

interface IDatabase {

    connect(): Promise<void>;

    disconnect(): void;

    getAll(): Promise<IUrl[]>;

    getUrlPairById(id: number): Promise<IUrl|null>;

    getUrlPairByShortUrl(shortUrl: string): Promise<IUrl|null>;

    getUrlPairByOriginalUrl(originalUrl: string): Promise<IUrl|null>;

    addUrlPair(originalUrl: string, shortUrl: string): Promise<number>;

    removeUrl(id: number): Promise<boolean>;
}

export default IDatabase;
