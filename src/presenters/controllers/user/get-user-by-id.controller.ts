import UserApplication from "@/app/user/use-case";
import { badRequest, notFound, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class GetUserByIdController implements BaseController {

  constructor(
    private readonly userApplication: UserApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        id,
      } = request.query;

      const user = await this.userApplication.getUserById(id);
      if(user.isErr) {
        const errCode = user.error.name;
        switch(errCode) {
          case "ERR_USER_NOT_FOUND": {
            return notFound(user.error);
          }
        }
      }

      return user.isOk ? ok(user.value) : badRequest(new Error("Unreconized error"));
    } catch (error: any) {
      return serverError(error);
    }
  }

}