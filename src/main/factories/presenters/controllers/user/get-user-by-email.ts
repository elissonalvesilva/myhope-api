import GetUserByEmailController from "@/presenters/controllers/user/get-user-by-email.controller";
import { makeUserApp } from "@/main/factories/app/user";

export const makeGetUserByEmail = (): GetUserByEmailController => {
  return new GetUserByEmailController(makeUserApp());
}