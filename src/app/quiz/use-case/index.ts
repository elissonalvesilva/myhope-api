import Hashing from "@/app/protocols/hashing";
import Quiz from "@/domain/quiz/entity";
import QuizRepository from "@/domain/quiz/repository";

export default class QuizApplication {
  constructor(
    private readonly hashing: Hashing,
    private readonly quizRepository: QuizRepository
  ){}

  async create(quiz: Quiz): Promise<boolean> {
    try {
      return await this.quizRepository.createQuiz(quiz);
    } catch (error) {
      throw error;
    }
  }

  async getQuizById(id: string): Promise<Quiz> {
    try {
      return await this.quizRepository.getQuizById(id);
    } catch (error) {
      throw error;
    }
  }

  async listQuizzes(): Promise<Quiz[]> {
    try {
      return await this.quizRepository.listQuizzes();
    } catch (error) {
      throw error;
    }
  }

  async deleteQuiz(id: string): Promise<boolean> {
    try {
      return await this.quizRepository.deleteQuiz(id);
    } catch (error) {
      throw error;
    }
  }

  async updateQuiz(quiz: Quiz): Promise<boolean> {
    try {
      return await this.quizRepository.updateQuiz(quiz);
    } catch (error) {
      throw error;
    }
  }

  async listQuizByParams(params: any): Promise<Quiz[]> {
    try {
      return await this.quizRepository.listQuizzesByParams(params);
    } catch (error) {
      throw error;
    }
  }
}