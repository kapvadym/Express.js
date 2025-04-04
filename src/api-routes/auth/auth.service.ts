import { Auth } from "./auth.model";
import { Account } from "../accounts/account.model";
import bcrypt from "bcrypt";

import AppError from "@/utils/AppError";

export const registerUser = async (email: string, password: string, username: string ) => {
  const existingUser = await Auth.findOne({ email });
  if(existingUser){
    throw new AppError("Email already registered", 400)
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const auth = new Auth({
    email: email,
    passwordHash: hash
  });
  await auth.save();
  
  const account = new Account({
    authId: auth._id,
    username: username
  });
  await account.save();

  return auth;
}

export const loginUser = async (email: string, password: string) => {
  const auth = await Auth.findOne({ email }).lean();
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

  return auth;
}