import SubmitQuizController from "@/presenters/controllers/user/submit-quiz.controller";
import { makeUserApp } from "@/main/factories/app/user";

export const makeSubmitQuiz = (): SubmitQuizController => {

  return new SubmitQuizController(makeUserApp());
}