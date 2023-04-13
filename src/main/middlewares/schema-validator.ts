import { adaptMiddlewareSchema } from "@/main/adapter/express-middleware-schema-adapter";
import { makeSchemaValidator } from "@/main/factories/presenters/middlewares";

export const schemaValidator = (schema: string, type: string) => {
  return adaptMiddlewareSchema(makeSchemaValidator(schema, type));
}
