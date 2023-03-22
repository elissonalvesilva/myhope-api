import Mapper from "@/domain/@/shared/domain/mapper";
import Quiz from "@/domain/quiz/entity";
import Answer from "../entity/answer";
import Question from "../entity/question";

export default class QuizMapper implements Mapper<Quiz> {
  toDomain(raw: any): Quiz {
    return new Quiz(
      raw.id,
      raw.type,
      raw.questions.map((question: any) => {
        return new Question(
          question.id,
          question.type,
          question.question,
          question.answers.map((answer: any) => {
            return new Answer(
              answer.id,
              answer.text,
            )
          }),
          new Answer(
            raw.id,
            raw.text,
          ),
          raw.value,
          true,
        )
      }),
    )
  }
  
  toPersistence(t: Quiz) {
    throw new Error("Method not implemented.");
  }
  
}