import { ResetCodeSchema, UpdatePasswordSchema, UserSchemaCreate, ForgotPassSchema, UpdateUserSchema } from "@/infra/validator/joi/user/schema";
import UserSchemaValidator from "@/infra/validator/joi/user/validator";

export const makeUserSchemaValidator = (type: string): UserSchemaValidator => {

  const schema = {
    'create': UserSchemaCreate,
    'reset_code': ResetCodeSchema,
    'update_pass': UpdatePasswordSchema,
    'forgot_pass': ForgotPassSchema,
    'update': UpdateUserSchema,
  }[type] || UserSchemaCreate;

  return new UserSchemaValidator(schema);
}