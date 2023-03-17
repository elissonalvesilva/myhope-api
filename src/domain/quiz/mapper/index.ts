import Mapper from "@/domain/@/shared/domain/mapper";
import Quiz from "@/domain/quiz/entity";

export default class QuizMapper implements Mapper<Quiz> {
  toDomain(raw: any): Quiz {
    throw new Error("Method not implemented.");
  }
  
  toPersistence(t: Quiz) {
    throw new Error("Method not implemented.");
  }
  
}