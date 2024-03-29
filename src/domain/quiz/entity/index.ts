import Question from "@/domain/quiz/entity/question";

export type QuizStatus = 'ACTIVE' | 'INACTIVE' | 'SCHEDULED';

export default class Quiz {
  private _id: string;
  private _type: string;
  private _questions: Question[];
  private _isWithTime: boolean = false;
  private _timeInSeconds?: number;
  private defaultTimeInSeconds: number = 600;
  private _quizStatus: QuizStatus;

  constructor(
    id: string,
    type: string,
    questions: Question[],
    quizStatus: QuizStatus = 'ACTIVE',
  ) {
    this._id = id;
    this._type = type;
    this._questions = questions;
    this._quizStatus = quizStatus;
  }

  get id() {
    return this._id
  }
  
  set id(val: string) {
    this._id = val
  }
  
  get type() {
    return this._type
  }
  
  set type(val: string) {
    this._type = val
  }
  
  get questions() {
    return this._questions
  }
  
  set questions(val: Question[]) {
    this._questions = val
  }

  get isWithTime() {
    return this._isWithTime
  }
  
  set isWithTime(val: boolean) {
    this._isWithTime = val
  }
  
  get timeInSeconds() {
    return this._timeInSeconds || 0
  }
  
  set timeInSeconds(val: number) {
    this._timeInSeconds = val
  }

  get quizStatus () {
    return this._quizStatus;
  }

  set quizStatus(val: QuizStatus) {
    this._quizStatus = val;
  }

  resultQuiz() {
    return this._questions.reduce((sum: number, question: Question) => {
      if(question.getSelectedAnswer()?.idAnswer === question.correctAnswer.idAnswer) {
        sum = sum + question.value;
      }
      return sum
    }, 0);
  }

  toJSON() {
    return {
      id: this._id,
      type: this._type,
      questions: this._questions.map((question) => question.toJSON()),
      isWithTime: this._isWithTime,
      timeInSeconds: this._timeInSeconds || this.defaultTimeInSeconds,
      quizStatus: this._quizStatus,
    }
  }
  
}