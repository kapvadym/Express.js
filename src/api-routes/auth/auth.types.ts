import { Document, Types } from "mongoose";

export interface IAuth extends Document {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
}