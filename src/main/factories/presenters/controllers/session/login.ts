import LoginController from "@/presenters/controllers/session/login.controller";
import { makeSessionApplication } from "@/main/factories/app/session";

export const makeLoginController = (): LoginController => {

  const sessionApp = makeSessionApplication();
  return new LoginController(sessionApp);
};