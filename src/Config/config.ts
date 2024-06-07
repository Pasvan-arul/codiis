import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "../Model/User";
import { Plan } from "../Model/Plan";
import { Video } from "../Model/Video";
import { VideoPlan } from "../Model/VideoPlan";
import { UserPlan } from "../Model/UserPlan";
import { UserFav } from "../Model/Favourite";
import { UserGroup } from "../Model/UserGroup";
import { GroupMember } from "../Model/GroupMember";

config();
const port: any = process.env.dbPort;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.Host,
  port,
  username: "postgres",
  password: process.env.Password,
  database: process.env.Database,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Plan,
    Video,
    VideoPlan,
    UserPlan,
    UserFav,
    UserGroup,
    GroupMember,
  ],
});
