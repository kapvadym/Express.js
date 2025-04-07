import mongoose, { Model, Schema } from "mongoose";
import { IFirm } from "./firm.types";

const FirmSchema:Schema<IFirm> = new Schema({
    firmName: { type: String, required: true },
    creator: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    members: [{
      user: { type: Schema.Types.ObjectId, ref: 'Account' },
      role: { type: String, enum: ['owner','admin','user'], default:'user'}
    }]
  },
  {
    timestamps: true
  }
);

export const Firm:Model<IFirm> = mongoose.model("Firm", FirmSchema);