import QuizApplication from "@/app/quiz/use-case";
import { badRequest, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class DeleteQuizController implements BaseController {
  constructor(
    private readonly quizApplication: QuizApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        id,
      } = request;

      const response = await this.quizApplication.deleteQuiz(id);
      if(response.isErr()) {
        const errCode = response.value.name;
        switch(errCode) {
          case "ERR_QUIZ_NOT_FOUND": {
            return badRequest(response.value)
          }
          default: {
            return badRequest(new Error("Unreconized error"))
          }
        }
      }
    
      return ok('deleted');
    } catch (error: any) {
      return serverError(error);
    }
  }
}