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
        userId,
      } = request;

      const {
        password,
      } = request.body;

      const user = await this.userApplication.resetPassword(userId, password);
      if(user.isErr) {
        const errCode = user.error.name;
        switch(errCode) {
          case "ERR_USER_NOT_FOUND": {
            return notFound(user.error);
          }
          case "ERR_TO_UPDATE_PASSWORD": {
            return badRequest(user.error);
          }
        }
      }

      return user.isOk ? ok(user.value) : badRequest(new Error("Unreconized error"));
    } catch (error: any) {
      return serverError(error);
    }
  }

}