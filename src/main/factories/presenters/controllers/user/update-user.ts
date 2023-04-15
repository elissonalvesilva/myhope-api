import UpdateUserController from "@/presenters/controllers/user/update-user.controller";
import { makeUserApp } from "@/main/factories/app/user";

export const makeUpdateUserController = (): UpdateUserController => {
  return new UpdateUserController(makeUserApp())
}