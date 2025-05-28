import { Document, Types } from "mongoose";

export interface INote extends Document {
  _id: Types.ObjectId;

  title: string;
  content: string;

  createdBy: Types.ObjectId;
  visibleTo: Types.ObjectId[];
  isPrivat: boolean;

  linkedNotes: Types.ObjectId[];
  linkedExpenses: Types.ObjectId[];
  linkedTasks: Types.ObjectId[];

  images: string[];
  deadline: Date;
}