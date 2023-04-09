import { makeUserApp } from "@/main/factories/app/user";
import UpdatePasswordController from "@/presenters/controllers/user/update-password.controller";

export const makeUpdatePasswordController = (): UpdatePasswordController => {
  const userApp = makeUserApp();
  return new UpdatePasswordController(userApp);
};