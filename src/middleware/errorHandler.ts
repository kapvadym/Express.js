import { Request, Response, NextFunction } from "express";
import AppError from "@/utils/AppError";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err as AppError;

  if(!(err instanceof AppError)){
    statusCode = 500;
    message = "Server error";
  }

  res.status(statusCode).json({
    status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
    message
  });
};

export default errorHandler;