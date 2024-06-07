import { Router } from "express";
import multer from "multer";
import Token from "../Middleware/UserToken";
import { Use } from "../Middleware/ErrorHandling";
import Admin from "../Controller/AdminController";

export const AdminRoute = Router();
AdminRoute.use(Token.adminToken);

const storage = multer.memoryStorage();
const upload = multer({ storage });

AdminRoute.post(
  "/upload_video",
  upload.single("video"),
  Use(Admin.uploadVideo)
);
AdminRoute.post("/plan", Use(Admin.planAdd));
AdminRoute.post("/video_mapping", Use(Admin.videoMapping));
AdminRoute.get("/plan", Use(Admin.planAll));
AdminRoute.put("/:id/plan", Use(Admin.planEdit));
AdminRoute.get("/:id/plan", Use(Admin.planGet));
AdminRoute.delete("/:id/plan", Use(Admin.planDelete));
