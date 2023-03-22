import Quiz from "@/domain/quiz/entity";
import QuizMapper from "@/domain/quiz/mapper";
import QuizRepository from "@/domain/quiz/repository";
import { QuizCollection } from "@/infra/db/mongo/quiz/model";

export default class QuizImplementation implements QuizRepository {
  async listQuizzes(): Promise<Quiz[] | null> {
    const quizzes = await QuizCollection.find();
    if(quizzes.length === 0) {
      return null;
    }

    const mapper = new QuizMapper();
    const quizList = quizzes.map((quiz) => {
      return mapper.toDomain(quiz);
    })

    return quizList;
  }

  async getQuizById(id: string): Promise<Quiz | null> {
    const resp = await QuizCollection.findOne({ id: id });
    if(!resp) {
      return null;
    }

    const mapper = new QuizMapper();
    const quiz = mapper.toDomain(resp);

    return quiz;
  }

  async createQuiz(quiz: Quiz): Promise<boolean> {
    const resp = await QuizCollection.create(quiz);
    if(!resp) {
      return false;
    }

    return true;
  }

  async updateQuiz(quiz: Quiz): Promise<boolean> {
    const resp = await QuizCollection.updateOne({
      id: quiz.id,
    }, quiz);
    if(resp.modifiedCount <= 0 ) {
      return false;
    }

    return true;
  }
  async deleteQuiz(id: string): Promise<boolean> {
    const resp = await QuizCollection.deleteOne({
      id,
    });
    if(resp.deletedCount <= 0 ) {
      return false;
    }

    return true;
  }
  async listQuizzesByParams(param: any): Promise<Quiz[] | null> {
    const quizzes = await QuizCollection.find(param);
    if(quizzes.length === 0) {
      return null;
    }

    const mapper = new QuizMapper();
    const quizList = quizzes.map((quiz) => {
      return mapper.toDomain(quiz);
    })

    return quizList;
  }
}