import UserApplication from "@/app/user/use-case";
import { badRequest, notFound, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class UpdatePasswordController implements BaseController {

  constructor(
    private readonly userApplication: UserApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        email,
        password,
        resetCode,
      } = request;

      const user = await this.userApplication.resetPassword(email, password, parseInt(resetCode));
      if(user.isErr()) {
        const errCode = user.value.name;
        switch(errCode) {
          case "ERR_USER_NOT_FOUND": {
            return notFound(user.value);
          }
          case "ERR_TO_UPDATE_PASSWORD": {
            return badRequest(user.value);
          }
          case "ERR_INVALID_RESET_CODE": {
            return badRequest(user.value);
          }
          default: {
            return badRequest(new Error("Unreconized error"));
          }
        }
      }

      return ok(user.value);
    } catch (error: any) {
      return serverError(error);
    }
  }

}