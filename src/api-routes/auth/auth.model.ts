import mongoose, { Schema, Model } from "mongoose";
import { IAuth } from "./auth.types";

const AuthSchema: Schema<IAuth> = new Schema(
  {
    email: {
      type: String,
      required: [true, "An account must have an email"],
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export const Auth: Model<IAuth> = mongoose.model<IAuth>("Auth", AuthSchema)