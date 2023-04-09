import AccountImplementation from "@/infra/db/mongo/account/impl";

export const makeAccountImpl = (): AccountImplementation => {
  return new AccountImplementation();
};