import SessionApplication from "@/app/session/use-case";
import { serverError, notFound, badRequest, ok } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class LogoutController implements BaseController {
  constructor(private readonly sessionApplication: SessionApplication) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        Authorization,
        userId,
      } = request;


      const session = await this.sessionApplication.getSession(userId);
      if(session.isErr) {
        const errCode = session.error.name;
        switch(errCode) {
          case "ERR_NOT_FOUND_SESSION": {
            return badRequest(session.error);
          }
        }
      }

      const sessionId = session.isOk ? session.value.id : '';
      if(sessionId === '') {
        return badRequest(new Error('Occurs some error during process session value'));
      }
      await this.sessionApplication.deleteSession(sessionId);

      return ok('logout');

    } catch (error: any) {
      return serverError(error);
    }
  }
}