import { Document, ObjectId } from "mongoose";

export interface IAuth extends Document {
  email: string;
  passwordHash: string;
}

export interface IAccount extends Document {
  _id: ObjectId;
  authId: ObjectId;
  username: string;
  description: string;
  avatarUrl: string;
}