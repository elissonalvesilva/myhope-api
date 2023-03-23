import Quiz from "@/domain/quiz/entity";
import Question from "@/domain/quiz/entity/question";
import Answer from "@/domain/quiz/entity/answer";

export default class QuizFactory {
  static create(quiz: any, questions: any[]): Quiz {
    return new Quiz(
      quiz.id,
      quiz.type,
      questions.map((question) => {
        return new Question(
          question.id,
          question.type,
          question.question,
          question.answers.map((answer) => {
            return new Answer(
              answer.id,
              answer.text,
              answer.isCorrect,
            )
          }),
          question.value,
          question.correctAnswer,
        )
      })
    );
  }
}