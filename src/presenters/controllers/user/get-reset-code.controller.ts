import UserApplication from "@/app/user/use-case";
import { badRequest, notFound, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class GetResetCodeController implements BaseController {

  constructor(
    private readonly userApplication: UserApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        email,
        resetCode,
      } = request

      const code = await this.userApplication.getResetCode(parseInt(resetCode), email);
      if(code.isErr()) {
        const errCode = code.value.name;
        switch(errCode) {
          case "ERR_RESET_CODE_USER_NOT_FOUND": {
            return notFound(code.value);
          }
          default: {
            return badRequest(new Error("Unreconized error"));
          }
        }
      }

      return ok(code.value);
    } catch (error: any) {
      return serverError(error);
    }
  }

}
