import AccountApplication from "@/app/account/user-case";
import { badRequest, notFound, serverError, ok } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class AccountController implements BaseController {

  constructor(
    private readonly accountApplication: AccountApplication,
  ){}


  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        amount,
      } = request;

      const response = await this.accountApplication.updateUserBalance(request.userId, amount);
      if(response.isErr()){
        const errCode = response.value.name;
        switch(errCode) {
          case "ERR_ACCOUNT_NOT_FOUND": {
            return notFound(response.value)
          }
          case "ERR_CANT_UPDATE_BALANCE": {
            return badRequest(response.value)
          }
          case "ERR_TO_ADD_STATEMENT": {
            return badRequest(response.value)
          }
          default:  {
            return badRequest(new Error("Unreconized error"));
          }
        }
      }

      return ok(response.value);
    } catch (error: any) {
      return serverError(error);
    }
  }
}