import QuizApplication from "@/app/quiz/use-case";
import { badRequest, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class GetQuizzesByParamsController implements BaseController {
  constructor(
    private readonly quizApplication: QuizApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {

      const {
        filter,
      } = request.body

      const response = await this.quizApplication.listQuizByParams(filter);
      if(response.isErr()) {
        const errCode = response.value.name;
        switch(errCode) {
          case "ERR_EMPTY_QUIZ": {
            return badRequest(response.value)
          }
          case "ERR_NOT_FOUND_QUIZ_BY_PARAMS": {
            return badRequest(response.value)
          }
          default: {
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