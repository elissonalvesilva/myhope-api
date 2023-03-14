import Question from "@/domain/quiz/value-objects/question";


export default class Quiz {
  private _id: string;
  private _type: string;
  private _questions: Question[];

  constructor(
    id: string,
    type: string,
    questions: Question[]
  ) {
    this._id = id;
    this._type = type;
    this._questions = questions;
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

  resultQuiz() {
    return this._questions.reduce((sum: number, question: Question) => {
      if(question.getSelectedAnswer()?.id === question.correctAnswer.id) {
        sum = sum + question.value;
      }
      return sum
    }, 0);
  }

  
}