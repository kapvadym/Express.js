import { Request, Response, NextFunction } from "express";
import { AccountType } from "../accounts/account.types";
import * as AuthService from "./auth.service"; 

import catchAsync from "@/utils/catchAsync";

interface IRegister {
  username: string;
  email: string;
  password: string;
  accountType: AccountType;
  firmName?: string;
}

interface ILogin {
  email: string;
  password: string;
}

export const Register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username, firmName, accountType }: IRegister = req.body;
  const result = await AuthService.registerUser({ email, password, username, firmName, accountType })

  res.status(201).json({
    status: "success",
    result
  })
})

export const Login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;
  const result = await AuthService.loginUser({ email, password })

  res.status(200).json({
    status: "success",
    result
  });
})