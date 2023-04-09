import AccountApplication from "@/app/account/user-case";
import { makeJWT } from "@/main/factories/infra/jwt";
import { makeAccountImpl } from "@/main/factories/infra/db/mongodb/account";

export const makeAccountApplication = (): AccountApplication => {
  const jwtImpl = makeJWT();
  const accountRepositoryImpl = makeAccountImpl();
  return new AccountApplication(jwtImpl, accountRepositoryImpl);
};