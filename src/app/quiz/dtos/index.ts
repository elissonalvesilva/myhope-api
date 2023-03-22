export interface AnswerDTO {
  text: string;
  isCorrect: boolean;
}

export interface QuestionDTO {
  type: string;
  question: string;
  answers: AnswerDTO[];
  correctAnswer?: AnswerDTO;
  value: number;
  selectedAnswer?: AnswerDTO;
}

export interface QuizDTO {
  type: string;
  questions: QuestionDTO[];
  isWithTime: boolean;
  timeInSeconds?: number;
}