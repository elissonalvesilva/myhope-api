import UserApplication from "@/app/user/use-case";
import { badRequest, conflitRequest, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class UpdateUserController implements BaseController {

  constructor(
    private readonly userApplication: UserApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {

      const {
        userId,
        params
      } = request;

      const response = await this.userApplication.updateUser(params, userId);
      if(response.isErr()) {
        const errCode = response.value.name;
        switch(errCode) {
          case "ERR_CREATE_ACCOUNT": {
            return badRequest(response.value)
          }
          case "ERR_USER_NOT_CREATED": {
            return badRequest(response.value)
          }
          case "ERR_USER_ALREADY_EXISTS": {
            return conflitRequest(response.value);
          }
          default: {
            console.log(response.value)
            return badRequest(new Error("Unreconized error"));
          }
        }
      }
    
      return ok(response.value);
    } catch (error: any) {
      console.error(error);
      return serverError(error);
    }
  }
}