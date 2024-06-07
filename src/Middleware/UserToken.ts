import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { User } from "../Model/User";

config();

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export default {
  userToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        res.json({ success: false, msg: "You must be login" });
      } else {
        const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        (req as CustomRequest).token = decoded;
        const { userId }: any = decoded;
        const user = await User.findOneBy({ id: userId });
        if (user) {
          next();
        } else {
          res.json({ success: false, msg: "access denied" });
        }
      }
    } catch (err) {
      res.status(401).json({ success: false, msg: "invalid token" });
    }
  },
  adminToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        res.json({ success: false, msg: "You must be login" });
      } else {
        const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        (req as CustomRequest).token = decoded;
        const { userId }: any = decoded;
        const user = await User.findOneBy({ id: userId, role: "admin" });
        if (user) {
          next();
        } else {
          res.json({ success: false, msg: "access denied" });
        }
      }
    } catch (err) {
      res.status(401).json({ success: false, msg: "invalid token" });
    }
  },
};
