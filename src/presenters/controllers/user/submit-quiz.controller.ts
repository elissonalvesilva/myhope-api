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
        submitedQuiz,
      } = request;

      const quiz = {
        idQuiz: submitedQuiz?.id,
        selectedAnswers: submitedQuiz?.selectedAnswers.map((answer: any) => {
          return {
            idQuestion: answer.idQuestion,
            idSelectedAnswer: parseInt(answer.idSelectedAnswer),
          }
        }),
      }

      const code = await this.userApplication.submitQuiz(userId, quiz);
      if(code.isErr()) {
        const errCode = code.value.name;
        switch(errCode) {
          case "ERR_SUBMITED_QUIZ_NOT_FOUND": {
            return notFound(code.value);
          }
          case "ERR_SUBMITED_QUIZ": {
            return badRequest(code.value);
          }
          case "ERR_USER_NOT_FOUND": {
            return badRequest(code.value);
          }

          default: {
            return badRequest(new Error("Unreconized error"));
          }
        }
      }

      return ok(code.value);
    } catch (error: any) {
      console.log(error);
      return serverError(error);
    }
  }

}
