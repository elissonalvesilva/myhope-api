import SessionApplication from "@/app/session/use-case";
import { makeUserImplementation } from "@/main/factories/infra/db/mongodb/user";
import { makeJWT } from "@/main/factories/infra/jwt";
import { makeSessionImplementation } from "@/main/factories/infra/db/mongodb/session";
import { makeCrypto } from "@/main/factories/infra/crypto";

export const makeSessionApplication = (): SessionApplication => {
  const jwtImpl = makeJWT();
  const userRepositoryImpl = makeUserImplementation();
  const sessionRepositoryImpl = makeSessionImplementation();
  const cryptographtImpl = makeCrypto();
  return new SessionApplication(jwtImpl, sessionRepositoryImpl, userRepositoryImpl, cryptographtImpl);
};