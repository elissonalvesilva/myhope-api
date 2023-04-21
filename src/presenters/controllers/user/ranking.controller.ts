import UserApplication from "@/app/user/use-case";
import { badRequest, notFound, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class RankingUserController implements BaseController {

  constructor(
    private readonly userApplication: UserApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        limit,
        page,
      } = request;

      const user = await this.userApplication.ranking({
        limit,
        page,
      });
      if(user.isErr()) {
        const errCode = user.value.name;
        switch(errCode) {
          case "ERR_TO_GET_RANKING": {
            return notFound(user.value);
          }
          default: {
            return badRequest(new Error("Unreconized error"));
          }
        }
      }

      return ok(user.value);
    } catch (error: any) {
      console.log(error);
      return serverError(error);
    }
  }

}