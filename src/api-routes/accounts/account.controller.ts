import { Request, Response, NextFunction } from "express";
import catchAsync from "@/utils/catchAsync";

export const GetProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    user: req.user
  })
})