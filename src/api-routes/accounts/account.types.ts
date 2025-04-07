import { Document, Types } from "mongoose";

export enum AccountType {
  Privat = 'privat',
  Buisness = 'buisness'
}

export enum AccountRole {
  Owner = 'owner',
  Admin = 'admin',
  User = 'user',
  Parent = 'parent',
  Child = 'child',
  Solo = 'solo'
}

export interface IAccount extends Document {
  _id: Types.ObjectId;
  authId: Types.ObjectId;

  username: string;
  email: string;
  description: string;
  avatarUrl: string;
  
  accountType: AccountType;

  firm?: Types.ObjectId | null;
  family?: Types.ObjectId | null;
  role: AccountRole;

  notes: Types.ObjectId[];
  tasks: Types.ObjectId[];
  expenses: Types.ObjectId[];
  events: Types.ObjectId[];
}

export interface ICreateAccount {
  authId: Types.ObjectId;
  username: string;
  email: string;
  accountType: AccountType;
  firmName?: string;
}