import { makeQuizApplication } from "@/main/factories/app/quiz";
import GetQuizzesController from "@/presenters/controllers/quiz/list-quizzes.controller";

export const makeListQuizzesController = (): GetQuizzesController => {

  const quizApp = makeQuizApplication();
  return new GetQuizzesController(quizApp);
}