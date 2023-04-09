import AuthMiddleware from "@/presenters/middlewares/auth-middlewares";
import { makeSessionApplication } from "@/main/factories/app/session";

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeSessionApplication())
};