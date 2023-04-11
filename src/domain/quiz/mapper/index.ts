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
          raw.value,
          new Answer(
            raw.id,
            raw.text,
            raw.isCorrect,
          ),
        )
      }),
    )
  }
  
  toPersistence(t: Quiz) {
    return {
      id: t.id,
      type: t.type,
      questions: t.questions.map((q) => { 
        return {
          type: q.type,
          question: q.question,
          answers: q.answers.map((ans) => {
            return {
              text: ans.text,
              isCorrect: ans.isCorrect,
            }
          }),
          value: q.value,
          correctAnswer: {
            text: q.correctAnswer.text,
            isCorrect: q.correctAnswer.isCorrect,
          }
        }
      }),
    }
  }
  
}