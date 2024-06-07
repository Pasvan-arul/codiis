import { Router } from "express";
import Token from "../Middleware/UserToken";
import { Use } from "../Middleware/ErrorHandling";
import UserController from "../Controller/UserController";

export const UserRoute = Router();
UserRoute.use(Token.userToken);

UserRoute.get("/:id/plan", Use(UserController.planGet));
UserRoute.post("/:id/plan", Use(UserController.planSubscribe));
UserRoute.get("/:id/video", Use(UserController.listVideo));
UserRoute.post("/:id/video", Use(UserController.addFavVideo));
UserRoute.get("/:id/fav_video", Use(UserController.listFavVideo));
UserRoute.delete("/:id/fav_video", Use(UserController.removeFavVideo));
UserRoute.post("/:id/group", Use(UserController.createGroup));

UserRoute.get("/:id/group", Use(UserController.listGroup));
UserRoute.get("/:id/member_group", Use(UserController.addGroupMember));
UserRoute.delete("/:id/member_group", Use(UserController.deleteGroupMember));
UserRoute.delete("/:id/group", Use(UserController.deleteGroup));
