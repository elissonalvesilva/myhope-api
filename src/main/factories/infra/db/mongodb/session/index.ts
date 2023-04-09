import SessionImplementation from "@/infra/db/mongo/session/impl";
import env from "@/main/config/environment";
import { makeJWT } from "@/main/factories/infra/jwt";

export const makeSessionImplementation = (): SessionImplementation => {
  const jwtImpl = makeJWT();
  return new SessionImplementation(jwtImpl, env.EXPIRE_TOKEN_IN_MINUTES);
}