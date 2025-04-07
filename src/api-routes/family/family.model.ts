import mongoose, { Model, Schema } from "mongoose";
import { IFamily } from "./family.types";

const FamilySchema:Schema<IFamily> = new Schema({
    name: { type: String, required: true },
    creator: {type: Schema.Types.ObjectId, ref:'Account', required: true },
    members: [{
      user: { type: Schema.Types.ObjectId, ref: 'Account' },
      role: { type: String, enum: ['parent', 'child'], default:'child'}
    }]
  },
  {
    timestamps: true
  }
);

export const Family:Model<IFamily> = mongoose.model("Firm", FamilySchema);