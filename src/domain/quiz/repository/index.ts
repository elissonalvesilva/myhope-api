import Quiz from "@/domain/quiz/entity";

export default interface QuizRepository {
  listQuizzes(): Promise<Quiz | Error>
  getQuizById(id: string): Promise<Quiz | Error>
  createQuiz(quiz: Quiz): Promise<boolean | Error>
  updateQuiz(quiz: Quiz): Promise<boolean | Error>
  deleteQuiz(quiz: Quiz): Promise<boolean | Error>
}