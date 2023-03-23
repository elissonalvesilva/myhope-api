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
      if(response.isErr) {
        const errCode = response.error.name;
        switch(errCode) {
          case "ERR_EMPTY_QUIZ": {
            return badRequest(response.error)
          }
          case "ERR_NOT_FOUND_QUIZ_BY_PARAMS": {
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