import { Request, Response } from "express";
import { UserFav } from "../Model/Favourite";
import { GroupMember } from "../Model/GroupMember";
import { Plan } from "../Model/Plan";
import { UserGroup } from "../Model/UserGroup";
import { UserPlan } from "../Model/UserPlan";
import { Video } from "../Model/Video";

export default {
  planGet: async (req: Request, res: Response) => {
    const plan = await Plan.find();
    const userPlan = await UserPlan.findBy({ user_id: req.params.id });
    plan.map((e) => {
      e["subscribed"] = false;
      userPlan.forEach((element) => {
        element.plan_id == e.id && (e["subscribed"] = true);
      });
    });
    res.json({ success: true, plan });
  },
  planSubscribe: async (req: Request, res: Response) => {
    const { plan_id, user_id, valid_upto } = req.body;
    const userPlanCheck = await UserPlan.findOneBy({ user_id, plan_id });
    if (userPlanCheck) {
      res.json({ success: false, msg: "User plan already subscribed" });
    } else {
      const userPlan = UserPlan.create({ user_id, plan_id, valid_upto });
      await userPlan.save();
      res.json({ success: true, msg: "Plan Subscribed successfully" });
    }
  },
  listVideo: async (req: Request, res: Response) => {
    const video = await Video.find({
      where: {
        video_plan: { plan: { user_plan: { user_id: req.params.id } } },
      },
      order: { created_on: "DESC" },
    });
    if (video.length == 0) {
      res.json({ success: false, msg: "Not Subscribed any plan" });
    } else {
      res.json({ success: true, video });
    }
  },
  addFavVideo: async (req: Request, res: Response) => {
    const { user_id, video_id } = req.body;
    const favCheck = await UserFav.findOneBy({ user_id, video_id });
    if (favCheck) {
      res.json({ success: false, msg: "Already in favourite list" });
    } else {
      const fav = UserFav.create({ user_id, video_id });
      await fav.save();
      res.json({ success: true, msg: "Video added to favourite list" });
    }
  },
  listFavVideo: async (req: Request, res: Response) => {
    const video = await Video.find({
      where: { fav: { user_id: req.params.id } },
      order: { fav: { created_on: "DESC" } },
    });
    res.json({ success: true, video });
  },
  removeFavVideo: async (req: Request, res: Response) => {
    await UserFav.delete({ id: req.params.id });
    res.json({ success: true, msg: "Video unfavourite successfully" });
  },
  createGroup: async (req: Request, res: Response) => {
    //   {name:"GroupName",member:["user_id1","user_id2"]}
    const { name, memeber } = req.body;
    const group = UserGroup.create({ user_id: req.params.id, name });
    const memberCount = memeber ? memeber.length : 0;
    if (memberCount > 0) {
      for (let i = 0; i < memberCount; i++) {
        const grpMem = GroupMember.create({
          group_id: group.id,
          user_id: memeber[i],
        });
        await grpMem.save();
      }
    }
    res.json({ success: true, msg: "Group added successfully" });
  },
  listGroup: async (req: Request, res: Response) => {
    const group = await UserGroup.find({
      where: { user_id: req.params.id },
      order: { created_on: "DESC" },
      relations: ["member.user"],
    });
    res.json({ success: true, group });
  },
  addGroupMember: async (req: Request, res: Response) => {
    const { group_id, user_id } = req.body;
    const grpMemCheck = await GroupMember.findOneBy({ group_id, user_id });
    if (grpMemCheck) {
      res.json({ success: false, msg: "User already in group" });
    } else {
      const grpMem = GroupMember.create({ group_id, user_id });
      await grpMem.save();
      res.json({ success: true, msg: "Member added in group successfully" });
    }
  },
  deleteGroupMember: async (req: Request, res: Response) => {
    await GroupMember.delete({ id: req.params.id });
    res.json({ success: true, msg: "Member removed from group successfully" });
  },
  deleteGroup: async (req: Request, res: Response) => {
    await GroupMember.delete({ group_id: req.params.id });
    await UserGroup.delete({ id: req.params.id });
    res.json({ success: true, msg: "Group deleted successfully" });
  },
};
