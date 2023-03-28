import { Middleware } from "@/presenters/protocols";
import { forbidden, ok, serverError } from "@/presenters/helpers/http";
import HttpResponse from "@/presenters/protocols/http";
import SessionApplication from "@/app/session/use-case";
import SessionMapper from "@/domain/session/mapper";


export default class AuthMiddleware implements Middleware {
  constructor(private readonly sessionApplication: SessionApplication){}
  
  async handle(request: any): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const currentSessionResponse = await this.sessionApplication.getSessionByToken(accessToken);
        if(currentSessionResponse.isErr) {
          const errCode = currentSessionResponse.error.name;
          switch(errCode) {
            case "ERR_NOT_FOUND_SESSION": {
              return forbidden(currentSessionResponse.error);
            }
          }
        }
        let currentSession = currentSessionResponse.isOk ? currentSessionResponse.value : null;
        const mapper = new SessionMapper();
        const currentSessionDomain = mapper.toDomain(currentSession);

        const isValidResponse = await this.sessionApplication.validateSession(currentSessionDomain);
        if(isValidResponse.isErr) {
          const errCode = isValidResponse.error.name;
          switch(errCode) {
            case "ERR_INVALID_SESSION": {
              return forbidden(isValidResponse.error);
            }
            case "ERR_NOT_FOUND_SESSION": {
              return forbidden(isValidResponse.error);
            }
          }
        }

        const isValidSession = isValidResponse.isOk ? isValidResponse.value : false;
        if(isValidSession) {
          return ok({ userId: currentSession?.userId });
        }

        return forbidden(new Error("Session Expired"));
      }
      return forbidden(new Error("Access denied"));
    } catch (error: any) {
      return serverError(error)
    }
  }
}