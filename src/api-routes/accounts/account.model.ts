import mongoose, { Schema, Model } from "mongoose";
import { IAccount } from "@/types/models";

const AccountSchema: Schema<IAccount> = new Schema({
    authId: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true
    },
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: ''
    },
    avatarUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const Account:Model<IAccount> = mongoose.model("Account", AccountSchema)
