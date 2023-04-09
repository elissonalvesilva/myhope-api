import { makeQuizApplication } from "@/main/factories/app/quiz";
import GetQuizzesByParamsController from "@/presenters/controllers/quiz/list-by-params-quiz.controller";

export const makeListQuizzesByParamsController = (): GetQuizzesByParamsController => {

  const quizApp = makeQuizApplication();
  return new GetQuizzesByParamsController(quizApp);
}