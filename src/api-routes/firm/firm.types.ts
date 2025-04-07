import { Document, Types } from "mongoose";

export interface IFirmMembers {
  user: Types.ObjectId;
  role: 'owner' | 'admin' | 'user' | 'parent' | 'child';
}

export interface IFirm extends Document {
  _id: Types.ObjectId;
  firmName: string;
  creator: Types.ObjectId;
  members: IFirmMembers[];
}

export interface IFirmCreate {
  firmName: string;
  creator: Types.ObjectId;
}