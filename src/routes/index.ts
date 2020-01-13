import { Router } from "express";
import adminRouter from "./admin";
import authRouter from "./auth";
import frontRouter from "./front";

const routers = Router();

routers.use("", frontRouter);
routers.use("/admin", adminRouter);
routers.use("", authRouter);

export default routers;
