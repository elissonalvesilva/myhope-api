import mongoose, { Schema, Document } from "mongoose";
import { AnswerDTO, QuestionDTO, QuizDTO } from "@/app/quiz/dtos";


interface AnswerModel extends AnswerDTO, Document{}
interface QuestionModel extends QuestionDTO, Document{}
interface QuizModel extends QuizDTO, Document{}


const answerSchema = new Schema({
  text: String,
  isCorrect: Boolean,
});

const questionSchema = new Schema({
  type: String,
  question: String,
  answers: [{ type: answerSchema }],
  correctAnswer: { type: answerSchema },
  value: Number,
  selectedAnswer: { type: answerSchema },
});

const quizSchema = new Schema({
  type: String,
  isWithTime: Boolean,
  timeInSeconds: Number,
  questions: [{ type: questionSchema }]
});

answerSchema.set("toJSON", {
  virtuals: true
});

questionSchema.set("toJSON", {
  virtuals: true
});

quizSchema.set("toJSON", {
  virtuals: true
});

const AnswerCollection = mongoose.model<AnswerModel>('Answer', answerSchema);
const QuestionCollection = mongoose.model<QuestionModel>('Question', questionSchema);
export const QuizCollection = mongoose.model<QuizModel>('Quiz', quizSchema);
