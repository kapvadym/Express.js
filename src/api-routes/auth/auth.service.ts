import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Auth } from "./auth.model";
import { Account } from "../accounts/account.model";
import * as AccountService from "../accounts/account.service"
import { AccountType, IAccount } from "../accounts/account.types";
import { IAuth } from "./auth.types";

import AppError from "@/utils/AppError";
import { config } from "../../config/index";


const SECRET_KEY = config.key as string

interface IRegisterInput {
  username: string;
  email: string;
  password: string;
  accountType: AccountType;
  firmName?: string;
}

export const registerUser = async ({ email, password, username, firmName, accountType }: IRegisterInput ) => {
  if(!email || !password || !username || !accountType){
    throw new AppError("All field's are required!", 400)
  }

  if(accountType === 'buisness' && !firmName) {
    throw new AppError("For buisness-account must be a Firm name!", 400)
  }

  const existingUser = await Auth.findOne({ email });
  if(existingUser){
    throw new AppError("Email already registered", 400)
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  const auth: IAuth = new Auth({ email, passwordHash });
  await auth.save();
  
  const account: IAccount = await AccountService.createAccount({ authId: auth._id, username, email, accountType, firmName})
  
  const token = jwt.sign({ id: account._id },SECRET_KEY,{expiresIn:'30d'})

  return {
    token,
    account
  }
}

interface ILoginInput {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: ILoginInput) => {
  const auth = await Auth.findOne({ email });
  if(!auth){
    throw new AppError("No User found with that ID!", 404);
  }

  const isValidPassword = await bcrypt.compare(password, auth.passwordHash);
  if(!isValidPassword){
    throw new AppError("Password is invalid", 401)
  }

  const account = await Account.findOne({ authId: auth._id })
  if(!account) {
    throw new AppError("Linked account not found", 404)
  }

  const token = jwt.sign({ id: auth._id },SECRET_KEY,{ expiresIn:'30d' })

  return token;
}