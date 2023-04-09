import UserApplication from "@/app/user/use-case";
import { badRequest, notFound, ok, serverError } from "@/presenters/helpers/http";
import BaseController from "@/presenters/protocols/base-controller";
import HttpResponse from "@/presenters/protocols/http";

export default class SubmitQuizController implements BaseController {

  constructor(
    private readonly userApplication: UserApplication,
  ){}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const {
        userId,
      } = request;

      const {
        submitedQuiz,
      } = request.body;

      const quiz = {
        idQuiz: submitedQuiz?.id,
        selectedAnswers: submitedQuiz?.selectedAnswers.map((answer: any) => {
          return {
            idQuestion: answer.idQuestion,
            idSelectedAnswer: answer.idSelectedAnswer,
          }
        }),
      }

      const code = await this.userApplication.submitQuiz(userId, quiz);
      if(code.isErr) {
        const errCode = code.error.name;
        switch(errCode) {
          case "ERR_SUBMITED_QUIZ_NOT_FOUND": {
            return notFound(code.error);
          }
          case "ERR_SUBMITED_QUIZ": {
            return badRequest(code.error);
          }
        }
      }

      return code.isOk ? ok(code.value) : badRequest(new Error("Unreconized error"));
    } catch (error: any) {
      return serverError(error);
    }
  }

}
