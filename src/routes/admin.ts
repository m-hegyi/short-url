import { Router } from "express";

import AdminController from "../controller/AdminController";
import FrontController from "../controller/FrontController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const routes = Router();

routes.get("/short-urls", AuthMiddleware.userMiddleware, AdminController.getUrls);
routes.get("/short-urls/:id", AuthMiddleware.userMiddleware, AdminController.getUrl);
routes.post("/short-urls", AuthMiddleware.userMiddleware, AdminController.createShortUrl);
routes.delete("/short-urls/:id", AuthMiddleware.userMiddleware, AdminController.removeShortUrl);

routes.get("/qrcodes");
routes.get("/qrcodes/:qrcodeId");
routes.post("/qrcodes");
routes.delete("/qrcodes", AuthMiddleware.userMiddleware, AdminController.getUrls);

export default routes;
