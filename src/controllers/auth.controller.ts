import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { loginUserSchema, registerUserSchema } from "../schemas/user.schema";
import User from "../models/user.model";

export const authController = {
  register: asyncHandler(async (req: any, res: any) => {
    const fields = registerUserSchema.safeParse(req.body);

    if (!fields.success) {
      return res
        .status(400)
        .json({ message: fields.error.flatten().fieldErrors });
    }

    const { name, email, password } = fields.data;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userInstance = new User({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await userInstance.save();

    res.status(201).json({ message: "user created", data: createdUser });
  }),
  login: asyncHandler(async (req: any, res: any) => {
    const fields = loginUserSchema.safeParse(req.body);

    if (!fields.success) {
      return res
        .status(400)
        .json({ message: fields.error.flatten().fieldErrors });
    }

    const { email, password } = fields.data;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "No user found!" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.cookie("appToken", token, {
      maxAge: 86400, // 1 day in seconds
      secure: process.env.NODE_ENV === "production",
      samesite: "strict",
    });

    return res
      .status(200)
      .json({ message: "Logged in successfully!", data: payload });
  }),
};
