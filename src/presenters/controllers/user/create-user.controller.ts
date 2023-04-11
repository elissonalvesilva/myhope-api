import Encrypt from "@/app/protocols/cryptography";
import Hashing from "@/app/protocols/hashing";
import UserApplication from "@/app/user/use-case";
import UserFactory from "@/domain/user/factories";
import { badRequest, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class CreateUserController implements BaseController {

  constructor(
    private readonly encrypt: Encrypt,
    private readonly hashing: Hashing,
    private readonly userApplication: UserApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        name,
        lastName,
        email,
        password,
      } = request;

      const encryptedPassword = this.encrypt.encrypt(password); 
      const id = this.hashing.hashId();
      const user = UserFactory.create({ id, name, lastName, email, password: encryptedPassword });

      const response = await this.userApplication.createUser(user)
      if(response.isErr()) {
        const errCode = response.value.name;
        switch(errCode) {
          case "ERR_CREATE_ACCOUNT": {
            return badRequest(response.value)
          }
          case "ERR_USER_NOT_CREATED": {
            return badRequest(response.value)
          }
          case "ERR_USER_ALREADY_EXISTS": {
            return badRequest(response.value);
          }
          default: {
            return badRequest(new Error("Unreconized error"));
          }
        }
      }
    
      return ok(response.value);
    } catch (error: any) {
      console.error(error);
      return serverError(error);
    }
  }
}