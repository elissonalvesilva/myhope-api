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
      } = request;

      const user = await this.userApplication.getUserById(id);
      if(user.isErr()) {
        const errCode = user.value.name;
        switch(errCode) {
          case "ERR_USER_NOT_FOUND": {
            return notFound(user.value);
          }
          default: {
            return badRequest(new Error("Unreconized error"));
          }
        }
      }

      return ok(user.value);
    } catch (error: any) {
      return serverError(error);
    }
  }

}