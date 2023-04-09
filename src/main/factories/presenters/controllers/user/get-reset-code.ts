import GetResetCodeController from "@/presenters/controllers/user/get-reset-code.controller";
import { makeUserApp } from "@/main/factories/app/user";

export const makeGetResetCode = (): GetResetCodeController => {
  const userApp = makeUserApp();
  return new GetResetCodeController(userApp);
};