import { Router } from "express";
import Token from "../Middleware/UserToken";
import Auth from "../Controller/AuthController";
import { Use } from "../Middleware/ErrorHandling";

export const AuthRoute = Router();
AuthRoute.use(Token.userToken);

AuthRoute.post("/customer_signup", Use(Auth.customerSignUp));
AuthRoute.post("/admin_signup", Use(Auth.adminSignUp));
AuthRoute.post("/signin", Use(Auth.signIn));
