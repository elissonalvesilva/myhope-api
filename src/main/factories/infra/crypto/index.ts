import Cryto from "@/infra/hashing/crypto";
import env from "@/main/config/environment";

export const makeCrypto = (): Cryto => {
  return new Cryto(env.SECRET_KEY, env.INIT_VECTOR);
};