import Hashing from "@/app/protocols/hashing";
import SessionApplication from "@/app/session/use-case";
import UserApplication from "@/app/user/use-case";
import UserMapper from "@/domain/user/mapper";
import { badRequest, notFound, ok, serverError, unauthorized } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class LoginController implements BaseController {
  constructor(
    private readonly sessionApplication: SessionApplication,
    private readonly userApplication: UserApplication,
    private readonly hashing: Hashing,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        email,
        password,
      } = request.body;

      const encrytedPassword = this.hashing.hash(password);
      const userResponse = await this.userApplication.getUserByEmail(email);
      if(userResponse.isErr) {
        const errCode = userResponse.error.name;
        switch(errCode) {
          case "ERR_USER_NOT_FOUND": {
            return notFound(userResponse.error);
          }
        }
      }
      const user = userResponse.isOk ? userResponse.value : null;
      if(!user) {
        return badRequest(new Error("error during process user response"));
      }

      if(!this.hashing.compare(encrytedPassword, user.getPassword())) {
        return unauthorized();
      }


      const mapper = new UserMapper();
      user.setPassword(encrytedPassword);
      const userDomain = mapper.toDomain(user);
      
      const session = await this.sessionApplication.createSession(userDomain);
      if(session.isErr) {
        const errCode = session.error.name;
        switch(errCode) {
          case "ERR_CREATE_SESSION": {
            return notFound(session.error);
          }
        }
      }

      return session.isOk ? ok(session.value) : badRequest(new Error("Unreconized error"));

    } catch (error: any) {
      return serverError(error);
    }
  }
}