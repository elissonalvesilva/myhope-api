import ForgotPasswordController from "@/presenters/controllers/user/forgot-password.controller";
import { makeUserApp } from "@/main/factories/app/user";

export const makeForgotPasswordController = ():ForgotPasswordController => {
  return new ForgotPasswordController(makeUserApp());
}