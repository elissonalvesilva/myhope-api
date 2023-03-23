import Hashing from "@/app/protocols/hashing";
import QuizApplication from "@/app/quiz/use-case";
import QuizFactory from "@/domain/quiz/factories";
import { badRequest, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class CreateQuizController implements BaseController {
  constructor(
    private readonly hashing: Hashing,
    private readonly quizApplication: QuizApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        type,
        questions,
        isWithTime,
        timeInSeconds,
      } = request.body;

      const quiz = QuizFactory.create({
        id: this.hashing.hash(),
        type,
        isWithTime,
        timeInSeconds
      }, questions)

      const response = await this.quizApplication.create(quiz)
      if(response.isErr) {
        const errCode = response.error.name;
        switch(errCode) {
          case "ERR_CANT_CREATE_QUIZ": {
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