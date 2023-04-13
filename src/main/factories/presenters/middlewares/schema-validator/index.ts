import SchemaValidatorMiddleware from "@/presenters/middlewares/schema-validator";
import { makeUserSchemaValidator } from "./user";

export const makeSchemaValidator = (schema: string, type: string): SchemaValidatorMiddleware => {

  const validator = {
    'user': makeUserSchemaValidator(type)
  }[schema] || makeUserSchemaValidator(type);
  
  return new SchemaValidatorMiddleware(validator);
}