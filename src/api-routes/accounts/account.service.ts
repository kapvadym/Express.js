import { ICreateAccount, IGetProfile, AccountType, AccountRole} from "./account.types";
import { IFirm } from "../firm/firm.types";
import { Account } from "./account.model";
import * as FirmService from "../firm/firm.service";

import AppError from "@/utils/AppError";
import { Firm } from "../firm/firm.model";
import { Auth } from "../auth/auth.model";

export const createAccount = async({ authId, username, email, accountType, firmName }: ICreateAccount ) => {
  if(accountType === AccountType.Buisness && !firmName){
    throw new AppError("Firm name is required for business accounts.", 400)
  }
  
  const account = new Account({
    authId,
    username,
    email,
    accountType,
    role: AccountRole.Solo
  });
  await account.save()

  if(accountType === AccountType.Buisness) {
    const firm: IFirm = await FirmService.createFirm({ firmName: firmName!, creator: account._id })
    account.firm = firm._id;
    account.role = AccountRole.Owner
    await account.save();
  }

  return account;
}

export const getAllUser = async({}) => {
  const users = await Account.find({})

  if(!users){
    throw new AppError("No Users found", 404)
  }

  return users;
}

export const getMe = async({ user }: IGetProfile) => {
  const me = await Account.findOne({ authId: user.id }) 

  if(!me){
    throw new AppError("No Users found with that ID!", 404)
  }

  return me
}

export const getProfile = async({ user }: IGetProfile) => {
  const profile = await Account.findOne({ authId: user })

  if(!profile){
    throw new AppError("No Users found with that ID!", 404)
  }

  return profile
}

export const deleteAccount = async({ user }: IGetProfile) => {
  const account = await Account.findOne({ authId: user.id })

  if(account?.accountType === AccountType.Buisness){
    await Firm.deleteOne({ creator: account.id })
  }
  await Account.deleteOne({ authId: user.id })
  await Auth.deleteOne({ _id: user.id })
}