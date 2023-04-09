import { makeQuizApplication } from "@/main/factories/app/quiz";
import GetQuizByIdController from "@/presenters/controllers/quiz/get-quiz-by-id.controller";

export const makeGetQuizByIdQuizController = (): GetQuizByIdController => {

  const quizApp = makeQuizApplication();
  return new GetQuizByIdController(quizApp);
}