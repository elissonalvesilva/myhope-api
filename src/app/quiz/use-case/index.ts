import { Result, err, ok } from "@/domain/@/shared/result";
import Hashing from "@/app/protocols/hashing";
import Quiz from "@/domain/quiz/entity";
import QuizRepository from "@/domain/quiz/repository";
import QuizError from "../error";

export default class QuizApplication {
  constructor(
    private readonly hashing: Hashing,
    private readonly quizRepository: QuizRepository
  ){}

  async create(quiz: Quiz): Promise<Result<boolean, QuizError>> {
    const resp = await this.quizRepository.createQuiz(quiz);
    if(!resp) {
      return err(new QuizError({
        name: "ERR_CANT_CREATE_QUIZ",
        message: "error to create quiz",
      }))
    }

    return ok(true);
  }

  async getQuizById(id: string): Promise<Result<Quiz, QuizError>> {
    const quiz = await this.quizRepository.getQuizById(id);
    if(!quiz) {
      return err(new QuizError({
        name: "ERR_QUIZ_NOT_FOUND",
        message: "error to get quiz. quiz not found",
      }))
    }

    return ok(quiz);
  }

  async listQuizzes(): Promise<Result<Quiz[], QuizError>> {
    const quizzes = await this.quizRepository.listQuizzes();
    if(!quizzes) {
      return err(new QuizError({
        name: "ERR_EMPTY_QUIZ",
        message: "error to list quizzes. Quizzes list is empty",
      }))
    }

    return ok(quizzes);
  }

  async deleteQuiz(id: string): Promise<Result<boolean, QuizError>> {
    const resp = await this.quizRepository.deleteQuiz(id);
    if(!resp) {
      return err(new QuizError({
        name: "ERR_QUIZ_NOT_FOUND",
        message: "error to delete quiz. Quiz not found",
      }));
    }

    return ok(true);
  }

  async updateQuiz(quiz: Quiz): Promise<Result<boolean, QuizError>> {
    const resp = await this.quizRepository.updateQuiz(quiz);
    if(!resp) {
      return err(new QuizError({
        name: "ERR_QUIZ_NOT_FOUND",
        message: "error to update quiz. Quiz not found",
      }));
    }

    return ok(true);
  }

  async listQuizByParams(params: any): Promise<Result<Quiz[], QuizError>> {
    const quizzes = await this.quizRepository.listQuizzesByParams(params);
    if(!quizzes) {
      return err(new QuizError({
        name: "ERR_EMPTY_QUIZ",
        message: "error to list quizzes by params",
      }))
    }

    return ok(quizzes);
  }
}