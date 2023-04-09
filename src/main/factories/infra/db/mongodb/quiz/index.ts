import QuizImplementation from "@/infra/db/mongo/quiz/impl";

export const makeQuizImpl = (): QuizImplementation => {
  return new QuizImplementation();
};