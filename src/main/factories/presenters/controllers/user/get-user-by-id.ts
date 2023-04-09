import GetUserByIdController from "@/presenters/controllers/user/get-user-by-id.controller";
import { makeUserApp } from "@/main/factories/app/user";

export const makeGetUserById = (): GetUserByIdController => {
  return new GetUserByIdController(makeUserApp());
};