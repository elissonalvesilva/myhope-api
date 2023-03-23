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
      } = request.query;

      const response = await this.quizApplication.deleteQuiz(id);
      if(response.isErr) {
        const errCode = response.error.name;
        switch(errCode) {
          case "ERR_QUIZ_NOT_FOUND": {
            return badRequest(response.error)
          }
        }
      }
    
      return response.isOk ? ok('deleted') : badRequest(new Error("Unreconized error"));
    } catch (error: any) {
      return serverError(error);
    }
  }
}