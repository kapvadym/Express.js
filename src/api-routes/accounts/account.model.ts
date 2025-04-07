import mongoose, { Schema, Model } from "mongoose";
import { AccountRole, AccountType, IAccount } from "./account.types";

const AccountSchema: Schema<IAccount> = new Schema({
    authId: { type: Schema.Types.ObjectId, ref: "Auth", required: true },

    username: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },

    accountType: { type: String, enum: Object.values(AccountType), required: true },

    firm: { type: Schema.Types.ObjectId, ref:'Firm', default: null },
    family: { type: Schema.Types.ObjectId, ref:'Family', default: null },
    role: { type: String, enum: Object.values(AccountRole), default: AccountRole.Solo },

    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  },
  {
    timestamps: true
  }
);

export const Account:Model<IAccount> = mongoose.model("Account", AccountSchema)
