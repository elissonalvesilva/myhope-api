import UserApplication from "@/app/user/use-case";
import { makeJWT } from "@/main/factories/infra/jwt";
import { makeUserImplementation } from "@/main/factories/infra/db/mongodb/user";
import { makeAccountImpl } from "@/main/factories/infra/db/mongodb/account";

export const makeUserApp = (): UserApplication => {
  const userRepositoryImpl = makeUserImplementation();
  const accountRepositoryImpl = makeAccountImpl();
  const jwtImpl = makeJWT();
  return new UserApplication(userRepositoryImpl, accountRepositoryImpl, jwtImpl);
};