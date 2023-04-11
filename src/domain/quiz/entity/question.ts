import Answer from "@/domain/quiz/entity/answer";

export default class Question {
  private _id: string;
  private _type: string;
  private _question: string;
  private _answers: Answer[];
  private _correctAnswer: Answer;
  private _value: number;
  private _selectedAnswer?: Answer;

  constructor(
    id: string,
    type: string,
    question:  string,
    answers: Answer[],
    value: number,
    correctAnswer: Answer,
  ) {
    this._id = id;
    this._type = type;
    this._question = question;
    this._answers = answers;
    this._correctAnswer = correctAnswer;
    this._value = value;
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
  
  get question() {
    return this._question
  }
  
  set question(val: string) {
    this._question = val
  }
  
  get answers() {
    return this._answers
  }
  
  set answers(val: Answer[]) {
    this._answers = val
  }
  
  get correctAnswer(): Answer {
    return this._correctAnswer;
  }
  
  set correctAnswer(val: Answer) {
    this._correctAnswer = val
  }
  
  get value() {
    return this._value
  }
  
  set value(val: number) {
    this._value = val
  }

  getSelectedAnswer(): Answer | undefined {
    if(this._selectedAnswer) {
      return this._selectedAnswer;
    }else {
      return undefined;
    }
  }

  addSelectedAnswer(answer: Answer) {
    this._selectedAnswer = answer
  }

  toJSON() {
    return {
      id: this._id,
      type: this._type,
      question: this._question,
      answers: this._answers.map((answer) => answer.toJSON()),
      correctAnswer: this._correctAnswer,
      value: this._value,
      selectedAnswer: this.getSelectedAnswer(),
    }
  }
}