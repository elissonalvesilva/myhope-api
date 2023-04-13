import UserApplication from "@/app/user/use-case";
import { Middleware } from "@/presenters/protocols";
import { forbidden, ok } from "@/presenters/helpers/http";
import HttpResponse from "@/presenters/protocols/http";

export default class ResetPasswordMiddleware implements Middleware {
  constructor(private readonly userApplication: UserApplication){}
  
  async handle(req: any): Promise<HttpResponse> {
    const { token } = req;

    if(token) {
      const isValidToken = await this.userApplication.validateResetToken(token);
      if(isValidToken.isErr()) {
        const errCode = isValidToken.value.name;
        switch(errCode) {
          case "ERR_INVALID_RESET_TOKEN": {
            return forbidden(isValidToken.value);
          }
          default: {
            return forbidden(new Error("Unreconized error"));
          }
        }
      }

      return ok('ok')
    }else {
      return forbidden(new Error('Access Denied'));
    }
  }
}