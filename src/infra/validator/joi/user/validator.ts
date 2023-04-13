import Joi, { ObjectSchema } from 'joi';

import { SchemaValidator } from "@/app/protocols/schema-validator";

export default class UserSchemaValidator implements SchemaValidator {
  constructor(private readonly schema: ObjectSchema){}
  
  async validate(params: any): Promise<Error | null> {
    const { error } = this.schema.validate(params);
    if(error) {
      return error;
    }

    return null;
  }
}