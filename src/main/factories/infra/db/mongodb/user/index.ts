import UserImplementation from "@/infra/db/mongo/user/impl";

export const makeUserImplementation = (): UserImplementation => {
  return new UserImplementation();
};