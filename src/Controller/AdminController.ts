import { Request, Response } from "express";
import path from "path";
import { uploadFile } from "../Middleware/S3_Upload";
import { Plan } from "../Model/Plan";
import { UserPlan } from "../Model/UserPlan";
import { Video } from "../Model/Video";
import { VideoPlan } from "../Model/VideoPlan";

export default {
  uploadVideo: async (req: Request, res: Response) => {
    if (!req.file) {
      res.json({ success: false, msg: "File is required" });
    } else {
      const { name, description } = req.body;
      const n = Date.now().toString() + path.extname(req.file.originalname);
      await uploadFile(req.file, n);
      const video = Video.create({ name, description });
      video.url = `${process.env.S3URL}/${n}`;
      await video.save();
      res.json({ success: true, msg: "Video Uploaded Successfully" });
    }
  },
  videoMapping: async (req: Request, res: Response) => {
    // {plan_id:"",video:["video_id1","video_id2"]}

    const { plan_id, video } = req.body;
    const plan = await Plan.findOneBy({ id: plan_id });
    const videoLength = video ? video.length : 0;
    if (!plan || videoLength == 0) {
      res.json({
        success: true,
        msg: "Plan not found or Video needs to select",
      });
    } else {
      for (let i = 0; i < videoLength; i++) {
        const videoPlanCheck = await VideoPlan.findOneBy({
          video_id: video[i],
          plan_id,
        });
        if (!videoPlanCheck) {
          const videoPlan = VideoPlan.create({ video_id: video[i], plan_id });
          await videoPlan.save();
        }
      }
      res.json({ success: true, msg: "Videos mapped through the Plan" });
    }
  },
  planAdd: async (req: Request, res: Response) => {
    const { name, validity, amount, discount } = req.body;
    const plan = Plan.create({ name, validity, amount, discount });
    await plan.save();
    res.json({ success: true, msg: "Plan Added Successfully", plan });
  },
  planAll: async (_: Request, res: Response) => {
    const plan = await Plan.find({ order: { created_on: "DESC" } });
    res.json({ success: true, plan });
  },
  planEdit: async (req: Request, res: Response) => {
    const planCheck = await Plan.findOneBy({ id: req.params.id });
    if (!planCheck) {
      res.json({ success: false, msg: "Plan not found" });
    } else {
      const plan = await Plan.merge(planCheck, req.body);
      await plan.save();
      res.json({ success: true, msg: "Plan Edited Successfully", plan });
    }
  },
  planGet: async (req: Request, res: Response) => {
    const plan = await Plan.findOneBy({ id: req.params.id });
    res.json({ success: true, plan });
  },
  planDelete: async (req: Request, res: Response) => {
    const userCheck = await UserPlan.findBy({ plan_id: req.params.id });
    const videoCheck = await Video.findBy({ plan_id: req.params.id });
    const msg =
      userCheck.length > 0 && videoCheck.length > 0
        ? `Can't delete the plan because it contains Users and Videos`
        : userCheck.length > 0 && videoCheck.length == 0
        ? `Can't delete because it contains Users`
        : userCheck.length == 0 && videoCheck.length > 0
        ? `Can't delete because it contains Videos`
        : (await Plan.delete({ id: req.params.id }),
          `Plan Deleted Successfully`);
    res.json({ success: true, msg });
  },
};
