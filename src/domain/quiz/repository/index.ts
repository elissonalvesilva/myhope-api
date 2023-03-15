import Quiz from "@/domain/quiz/entity";

export default interface QuizRepository {
  listQuizzes(): Promise<Quiz[]>
  getQuizById(id: string): Promise<Quiz>
  createQuiz(quiz: Quiz): Promise<boolean>
  updateQuiz(quiz: Quiz): Promise<boolean>
  deleteQuiz(id: string): Promise<boolean>
  listQuizzesByParams(param: any): Promise<Quiz[]>
}