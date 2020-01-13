import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.SERVER_PORT;

app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`server started at http://localhost:${port}`);
});
