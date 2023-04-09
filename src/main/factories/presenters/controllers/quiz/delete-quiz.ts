import { makeQuizApplication } from "@/main/factories/app/quiz";
import DeleteQuizController from "@/presenters/controllers/quiz/delete-quiz.controller";

export const makeDeleteQuizController = (): DeleteQuizController => {

  const quizApp = makeQuizApplication();
  return new DeleteQuizController(quizApp);
}