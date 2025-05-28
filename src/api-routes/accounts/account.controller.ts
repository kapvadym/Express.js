import { Request, Response, NextFunction } from "express";
import * as AccountService from "./account.service";
import catchAsync from "@/utils/catchAsync";
import mongoose from "mongoose";

export const getMe = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  const result = await AccountService.getMe({ user })

  res.status(200).json({
    status: "success",
    result
  })
})

export const getProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const user = new mongoose.Types.ObjectId(req.params.id)
  const result = await AccountService.getProfile({ user })

  res.status(200).json({
    status: "success",
    result
  })
})

export const getAll = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const result = await AccountService.getAllUser({});
  res.status(200).json({
    status: "success",
    result 
  })
})

export const deleteAccount = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
 const user = req.user;
 const result = await AccountService.deleteAccount({ user });

 res.status(200).json({
  status:"success",
  message:"Account has been deleted",
  result
 })
})