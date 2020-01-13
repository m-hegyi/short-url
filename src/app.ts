import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import routes from "./routes/index";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

export default app;
