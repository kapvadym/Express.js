import { Auth } from "./auth.model";
import { Account } from "../accounts/account.model";
import bcrypt from "bcrypt";

export const registerUser = async (email: string, password: string, username: string ) => {
  const existingUser = await Auth.findOne({ email });
  if(existingUser){
    throw new Error("Email already registered")
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

  return account;
}

export const loginUser = async (email: string, password: string) => {
  const user = await Auth.findOne({ email }).lean();

  if(!user){
    throw new Error("No User found with that ID!");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if(!isValidPassword){
    throw new Error("Password is invalid")
  }

  return user;
}