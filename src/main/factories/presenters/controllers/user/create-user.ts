import CreateUserController from "@/presenters/controllers/user/create-user.controller";
import { makeCrypto } from "@/main/factories/infra/crypto";
import { makeJWT } from "@/main/factories/infra/jwt";
import { makeUserApp } from "@/main/factories/app/user";

export const makeCreateUserController = (): CreateUserController => {
  const crypto = makeCrypto();
  const hashing = makeJWT();
  const userApplication = makeUserApp();
  return new CreateUserController(crypto, hashing, userApplication);
};