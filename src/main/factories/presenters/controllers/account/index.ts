import AccountController from "@/presenters/controllers/account";
import { makeAccountApplication } from "@/main/factories/app/account";

export const makeAccountController = (): AccountController => {

  const accountApp = makeAccountApplication();
  return new AccountController(accountApp);
};