import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { AppDataSource } from "./Config/config";
import { UserRoute } from "./Router/UserRoute";
import { AdminRoute } from "./Router/AdminRoute";
import { AuthRoute } from "./Router/AuthRoute";

const app = express();
config();

AppDataSource.initialize()
  .then(() => {
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    app.use("/admin", AdminRoute);
    app.use("/public", AuthRoute);
    app.use("/user", UserRoute);

    app.use(async (err: any, _: Request, res: Response, next: NextFunction) => {
      console.log(next);
      res.json({ success: false, msg: "invalid request", err });
    });
    const date = new Date();
    console.log(`Connected to database at ${date}`);
  })
  .catch((error) => console.log(error));

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
