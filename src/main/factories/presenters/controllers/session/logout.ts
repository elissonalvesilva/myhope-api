import { makeSessionApplication } from "@/main/factories/app/session";
import LogoutController from "@/presenters/controllers/session/logout.controller";

export const makeLogoutController = (): LogoutController => {
  const sessionApp = makeSessionApplication();
  return new LogoutController(sessionApp);
};