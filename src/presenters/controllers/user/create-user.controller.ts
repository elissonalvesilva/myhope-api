import Encrypt from "@/app/protocols/encrypt";
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
      } = request.body;

      const encryptedPassword = this.encrypt.encrypt(password); 
      const id = this.hashing.hash(email);
      const user = UserFactory.create({ id, name, lastName, email, password: encryptedPassword });

      const response = await this.userApplication.createUser(user)
      if(response.isErr) {
        const errCode = response.error.name;
        switch(errCode) {
          case "ERR_CREATE_ACCOUNT": {
            return badRequest(response.error)
          }
          case "ERR_USER_NOT_CREATED": {
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