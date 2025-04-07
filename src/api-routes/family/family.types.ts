import { Document, Types } from "mongoose";

export interface IFamilyMembers {
  user: Types.ObjectId;
  role: 'parent' | 'child';
}

export interface IFamily extends Document {
  name: string;
  creator: Types.ObjectId;
  members: IFamilyMembers[];
}