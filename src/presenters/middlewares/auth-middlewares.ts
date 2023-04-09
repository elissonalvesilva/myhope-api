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
        if(currentSessionResponse.isErr()) {
          const errCode = currentSessionResponse.value.name;
          switch(errCode) {
            case "ERR_NOT_FOUND_SESSION": {
              return forbidden(currentSessionResponse.value);
            }
            default: {
              return forbidden(new Error("Unreconized error"));
            }
          }
        }
        let currentSession = currentSessionResponse.value;
        const mapper = new SessionMapper();
        const currentSessionDomain = mapper.toDomain(currentSession);

        const isValidResponse = await this.sessionApplication.validateSession(currentSessionDomain);
        if(isValidResponse.isErr()) {
          const errCode = isValidResponse.value.name;
          switch(errCode) {
            case "ERR_INVALID_SESSION": {
              return forbidden(isValidResponse.value);
            }
            case "ERR_NOT_FOUND_SESSION": {
              return forbidden(isValidResponse.value);
            }
            default: {
              return forbidden(new Error("Unreconized error"));
            }
          }
        }

        const isValidSession = isValidResponse.value;
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