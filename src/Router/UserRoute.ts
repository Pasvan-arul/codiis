import { Router } from "express";
import Token from "../Middleware/UserToken";
import { Use } from "../Middleware/ErrorHandling";
import UserController from "../Controller/UserController";

export const UserRoute = Router();
UserRoute.use(Token.userToken);

UserRoute.get("/:id/plan", Use(UserController.planGet));
