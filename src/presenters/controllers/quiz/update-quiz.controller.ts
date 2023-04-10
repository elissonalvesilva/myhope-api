import QuizApplication from "@/app/quiz/use-case";
import QuizFactory from "@/domain/quiz/factories";
import { badRequest, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class UpdateQuizController implements BaseController {
  constructor(
    private readonly quizApplication: QuizApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        id,
      } = request;

      const {
        type,
        questions,
        isWithTime,
        timeInSeconds,
      } = request;

      const quiz = QuizFactory.create({
        id,
        type,
        isWithTime,
        timeInSeconds
      }, questions)

      const response = await this.quizApplication.updateQuiz(quiz);
      if(response.isErr()) {
        const errCode = response.value.name;
        switch(errCode) {
          case "ERR_QUIZ_NOT_FOUND": {
            return badRequest(response.value)
          }
          case "ERR_CANT_UPDATE_QUIZ": {
            return badRequest(response.value)
          }
        }
      }
    
      return ok('updated');
    } catch (error: any) {
      return serverError(error);
    }
  }
}