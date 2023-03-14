import Answer from "./answer";

export default class Question {
  private _id: string;
  private _type: string;
  private _question: string;
  private _answers: Answer[];
  private _correctAnswer: Answer;
  private _value: number;
  private _isWithTime: boolean;
  private _timeInSeconds?: number;
  private _selectedAnswer?: Answer;

  constructor(
    id: string,
    type: string,
    question:  string,
    answers: Answer[],
    correctAnswer: Answer,
    value: number,
    isWithTime:  boolean,
  ) {
    this._id = id;
    this._type = type;
    this._question = question;
    this._answers = answers;
    this._correctAnswer = correctAnswer;
    this._value = value;
    this._isWithTime = isWithTime;
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
  
  get correctAnswer() {
    return this._correctAnswer
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
}