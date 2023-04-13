import { UserSchemaCreate } from "@/infra/validator/joi/user/schema";
import UserSchemaValidator from "@/infra/validator/joi/user/validator";

export const makeUserSchemaValidator = (type: string): UserSchemaValidator => {

  const schema = {
    'create': UserSchemaCreate
  }[type] || UserSchemaCreate;

  return new UserSchemaValidator(schema);
}