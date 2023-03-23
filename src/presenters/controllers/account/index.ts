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
      } = request.body;

      const response = await this.accountApplication.updateUserBalance(request.userId, amount);
      if(response.isErr){
        const errCode = response.error.name;
        switch(errCode) {
          case "ERR_ACCOUNT_NOT_FOUND": {
            return notFound(response.error)
          }
          case "ERR_CANT_UPDATE_BALANCE": {
            return badRequest(response.error)
          }
          case "ERR_TO_ADD_STATEMENT": {
            return badRequest(response.error)
          }
        }
      }

      return response.isOk ? ok(response.value) : badRequest(new Error("Unreconized error"));
    } catch (error: any) {
      return serverError(error);
    }
  }
}