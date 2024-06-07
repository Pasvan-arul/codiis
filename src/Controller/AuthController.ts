import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Model/User";

export default {
  customerSignUp: async (req: Request, res: Response) => {
    const { name, email, password, mobile } = req.body;
    const userCheck = await User.find({ where: [{ email }, { mobile }] });
    if (userCheck.length > 0) {
      res.json({ success: false, msg: "User already exist" });
    } else {
      const hashpassword = await bcrypt.hash(password, 10);
      const user = User.create({ name, email, mobile, password: hashpassword });
      await user.save();
      res.json({ success: true, msg: "Signup Successfully" });
    }
  },
  adminSignUp: async (req: Request, res: Response) => {
    const { name, email, password, mobile } = req.body;
    const userCheck = await User.find({ where: [{ email }, { mobile }] });
    if (userCheck.length > 0) {
      res.json({ success: false, msg: "User already exist" });
    } else {
      const hashpassword = await bcrypt.hash(password, 10);
      const user = User.create({ email, mobile, password: hashpassword, name });
      user.role = "admin";
      await user.save();
      res.json({ success: true, msg: "Signup Successfully" });
    }
  },
  signIn: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOneBy({ email });
    if (!user) {
      res.json({ success: false, msg: "User not found" });
    } else if (await bcrypt.compare(password, `${user.password}`)) {
      const token = jwt.sign(
        { userId: user.id },
        `${process.env.ACCESS_TOKEN}`
      );
      user.last_login_date = new Date();
      await user.save();
      res.json({ success: true, token, user });
    } else {
      res.json({ success: false, msg: "Invalid Credentials" });
    }
  },
};
