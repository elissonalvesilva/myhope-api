import UserApplication from "@/app/user/use-case";
import { badRequest, notFound, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class ForgotPasswordController implements BaseController {
  constructor(
    private readonly userApplication: UserApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {

      const {
        email,
      }= request;

      const resetCode = await this.userApplication.forgotPassword(email);
      if(resetCode.isErr()) {
        const errCode = resetCode.value.name;
        switch(errCode) {
          case "ERR_USER_NOT_FOUND": {
            return notFound(resetCode.value)
          }
          case "ERR_TO_SET_RESET_CODE": {
            return badRequest(resetCode.value);
          }
          case "ERR_TO_SEND_EMAIL_WITH_RESET_CODE": {
            return badRequest(resetCode.value);
          }
          default: {
            return badRequest(new Error("Unreconized error"));
          }
        }
      }

      return ok(resetCode.value);
      
    } catch (error: any) {
      return serverError(error);
    }
  }
}
