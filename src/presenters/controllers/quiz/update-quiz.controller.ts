import QuizApplication from "@/app/quiz/use-case";
import QuizFactory from "@/domain/quiz/factories";
import { badRequest, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class GetQuizByIdController implements BaseController {
  constructor(
    private readonly quizApplication: QuizApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        id,
      } = request.query;

      const {
        type,
        questions,
        isWithTime,
        timeInSeconds,
      } = request.body;

      const quiz = QuizFactory.create({
        id,
        type,
        isWithTime,
        timeInSeconds
      }, questions)

      const response = await this.quizApplication.updateQuiz(quiz);
      if(response.isErr) {
        const errCode = response.error.name;
        switch(errCode) {
          case "ERR_QUIZ_NOT_FOUND": {
            return badRequest(response.error)
          }
          case "ERR_CANT_UPDATE_QUIZ": {
            return badRequest(response.error)
          }
        }
      }
    
      return response.isOk ? ok('updated') : badRequest(new Error("Unreconized error"));
    } catch (error: any) {
      return serverError(error);
    }
  }
}