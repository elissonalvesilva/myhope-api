import { makeQuizApplication } from "@/main/factories/app/quiz";
import UpdateQuizController from "@/presenters/controllers/quiz/update-quiz.controller";

export const makeUpdateQuizController = (): UpdateQuizController => {

  const quizApp = makeQuizApplication();
  return new UpdateQuizController(quizApp);
}