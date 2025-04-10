import * as AuthService from "../auth.service";
import { AccountType } from "../../accounts/account.types";
import AppError from "../../../utils/AppError"

describe("AuthService - registerUser", () => {
  it("It must create Privat-User and return token", async () => {
    const result = await AuthService.registerUser({
      email: "test@mail.com",
      password: "securepass",
      username: "vadym",
      accountType: AccountType.Privat
    });

    expect(result).toHaveProperty("token");
    expect(result.account.email).toBe("test@mail.com");
    expect(result.token).toMatch(/^[A-Za-z0-9-_.]+$/);
  });

  it("It must throw error with registered email", async () => {
    await AuthService.registerUser({
      email: "test@mail.com",
      password: "securepass",
      username: "vadym",
      accountType: AccountType.Privat
    });

    await expect(AuthService.registerUser({
      email: "test@mail.com",
      password: "anotherpass",
      username: "vadim2",
      accountType: AccountType.Privat
    })).rejects.toThrow(new AppError("Email already registered",400));
  });
});
