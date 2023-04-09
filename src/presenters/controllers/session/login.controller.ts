import SessionApplication from "@/app/session/use-case";
import { badRequest, ok, serverError, unauthorized } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class LoginController implements BaseController {
  constructor(
    private readonly sessionApplication: SessionApplication,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        email,
        password,
      } = request.body;

      const session = await this.sessionApplication.signIn(email, password);
      if(session.isErr()) {
        const errCode = session.value.name;
        switch(errCode) {
          case "ERR_USER_OR_PASSWORD_IS_INVALID": {
            return unauthorized();
          }
          case "ERR_CREATE_SESSION": {
            return badRequest(session.value);
          }
          default: {
            return badRequest(new Error("Unreconized error"));
          }
        }
      }

      return ok(session.value);

    } catch (error: any) {
      return serverError(error);
    }
  }
}