import { IFirm, IFirmCreate } from "./firm.types";
import { Firm } from "./firm.model";

import AppError from "@/utils/AppError";

export const createFirm = async({ firmName, creator }: IFirmCreate): Promise<IFirm> => {
  if(!firmName) {
    throw new AppError("Firma must has a name!", 400)
  }

  const firm = new Firm({
    firmName: `${firmName}'s Company`,
    creator,
    members: [{ user: creator, role: "owner"}]
  })
  await firm.save()

  return firm;
}