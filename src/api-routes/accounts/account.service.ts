import { ICreateAccount, AccountType, AccountRole } from "./account.types";
import { IFirm } from "../firm/firm.types";
import { Account } from "./account.model";
import * as FirmService from "../firm/firm.service";

import AppError from "@/utils/AppError";

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