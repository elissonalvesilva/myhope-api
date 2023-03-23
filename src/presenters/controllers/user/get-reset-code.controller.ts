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
      const code = await this.userApplication.getResetCode(request.userId);
      if(code.isErr) {
        const errCode = code.error.name;
        switch(errCode) {
          case "ERR_RESET_CODE_USER_NOT_FOUND": {
            return notFound(code.error);
          }
        }
      }

      return code.isOk ? ok(code.value) : badRequest(new Error("Unreconized error"));
    } catch (error: any) {
      return serverError(error);
    }
  }

}
