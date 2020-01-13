import { Router } from "express";
import FrontController from "../controller/FrontController";

const routes = Router();

routes.get("/s/:encryptedId", FrontController.redirectByShortUrl);

export default routes;
