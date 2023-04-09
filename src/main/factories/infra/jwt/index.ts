import JWTImplemenation from "@/infra/hashing/jwt";
import env from "@/main/config/environment";

export const makeJWT = (): JWTImplemenation => {
  return new JWTImplemenation(env.SECRET_KEY, env.EXPIRE_TOKEN_IN_MINUTES);
};