import CreateQuizController from "@/presenters/controllers/quiz/create-quiz.controller";
import { makeJWT } from "@/main/factories/infra/jwt";
import { makeQuizApplication } from "@/main/factories/app/quiz";

export const makeCreateQuizController = (): CreateQuizController => {

  const quizApp = makeQuizApplication();
  return new CreateQuizController(makeJWT(), quizApp);
}