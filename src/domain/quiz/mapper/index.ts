import Mapper from "@/domain/@/shared/domain/mapper";
import Quiz from "@/domain/quiz/entity";
import Answer from "../entity/answer";
import Question from "../entity/question";

export default class QuizMapper implements Mapper<Quiz> {
  toDomain(raw: any): Quiz {
    const quiz =  new Quiz(
      raw.id,
      raw.type,
      raw.questions.map((question: any) => {
        return new Question(
          question.id,
          question.type,
          question.question,
          question.answers.map((answer: any) => {
            return new Answer(
              answer.idAnswer,
              answer.text,
              answer.isCorrect,
            )
          }),
          question.value,
          new Answer(
            question.correctAnswer.idAnswer,
            question.correctAnswer.text,
            question.correctAnswer.isCorrect,
          ),
        )
      }),
    )

    if(raw.quizStatus) {
      quiz.quizStatus = raw.quizStatus;
    }

    return quiz;
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
              idAnswer: ans.idAnswer,
              text: ans.text,
              isCorrect: ans.isCorrect,
            }
          }),
          value: q.value,
          correctAnswer: {
            idAnswer: q.correctAnswer.idAnswer,
            text: q.correctAnswer.text,
            isCorrect: q.correctAnswer.isCorrect,
          },
        }
      }),
      quizStatus: t.quizStatus,
    }
  }
  
}