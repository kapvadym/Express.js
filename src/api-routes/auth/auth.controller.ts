import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "./auth.service"; 
import { config } from "../../config/index";

import catchAsync from "@/utils/catchAsync";

const SECRET_KEY = config.key as string

interface IRegister {
  email: string;
  password: string;
  username: string;
}

interface ILogin {
  email: string;
  password: string;
}

export const Register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username }: IRegister = req.body;
  const auth = await registerUser(email, password, username);

  const token = jwt.sign(
    {
      _id: auth._id
    },
    SECRET_KEY,
    {
      expiresIn: "30d"
    }
  );

  res.status(201).json({
    status: "success",
    token
  })
})

export const Login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;
  const auth = await loginUser(email, password)

  const token = jwt.sign(
    {
      _id: auth._id
    },
    SECRET_KEY,
    {
      expiresIn: "30d"
    }
  );

  res.status(200).json({
    status: "success",
    token
  });
})