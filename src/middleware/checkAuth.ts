import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index";
import AppError from "@/utils/AppError";

const SECRET_KEY = config.key

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token){
    throw new AppError("Unauthorization", 401)
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError("Wrong or expiered token", 401))
  }
}