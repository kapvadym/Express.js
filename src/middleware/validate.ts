import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import AppError from "@/utils/AppError";

const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    const message = err.errors?.[0]?.message || "Invalid input";
    next(new AppError(message, 400));
  }
}

export default validate;