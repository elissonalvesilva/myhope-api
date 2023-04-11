import ResetPasswordMiddleware from "@/presenters/middlewares/reset-password-middleware"
import { makeUserApp } from "@/main/factories/app/user"


export const makeResetTokenMiddleware = (): ResetPasswordMiddleware => {
  return new ResetPasswordMiddleware(makeUserApp());
}