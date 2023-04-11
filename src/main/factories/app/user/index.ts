import UserApplication from "@/app/user/use-case";
import { makeJWT } from "@/main/factories/infra/jwt";
import { makeUserImplementation } from "@/main/factories/infra/db/mongodb/user";
import { makeAccountImpl } from "@/main/factories/infra/db/mongodb/account";
import { makeCrypto } from "@/main/factories/infra/crypto";
import { makeQuizImpl } from "@/main/factories/infra/db/mongodb/quiz";
import { makeNodeMailer } from "@/main/factories/infra/nodemailer";

export const makeUserApp = (): UserApplication => {
  const userRepositoryImpl = makeUserImplementation();
  const accountRepositoryImpl = makeAccountImpl();
  const jwtImpl = makeJWT();
  const encrypt = makeCrypto()
  const quizImpl = makeQuizImpl();
  const emailService = makeNodeMailer();
  return new UserApplication(userRepositoryImpl, accountRepositoryImpl, jwtImpl, encrypt, quizImpl, emailService);
};