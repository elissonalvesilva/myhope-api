import UserApplication from "@/app/user/use-case";
import { Middleware } from "@/presenters/protocols";
import { badRequest, forbidden, ok } from "@/presenters/helpers/http";
import HttpResponse from "@/presenters/protocols/http";
import { SchemaValidator } from "@/app/protocols/schema-validator";

export default class SchemaValidatorMiddleware implements Middleware {
  constructor(private readonly validator: SchemaValidator){}
  
  async handle(req: any): Promise<HttpResponse> {
    try {
      const response = await this.validator.validate(req);
      if(!response) {
        return ok('ok');
      }else {
        return badRequest(response);
      }
    } catch (error: any) {
      return badRequest(error);
    }
  }
}