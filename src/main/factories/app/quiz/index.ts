import { makeJWT } from "@/main/factories/infra/jwt";
import QuizApplication from "@/app/quiz/use-case";
import { makeQuizImpl } from "@/main/factories/infra/db/mongodb/quiz";

export const makeQuizApplication = (): QuizApplication => {
  const jwtImpl = makeJWT();
  const quizRepositoryImplementation = makeQuizImpl();
  return new QuizApplication(jwtImpl, quizRepositoryImplementation);
};