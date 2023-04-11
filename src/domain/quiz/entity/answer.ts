export default class Answer {
  private _idAnswer: number;
  private _text: string;
  private _isCorrect: boolean = false;

  constructor(id: number, text: string, isCorrect: boolean = false) {
    this._idAnswer = id;
    this._text = text;
    this._isCorrect = isCorrect
  }

  get idAnswer() {
    return this._idAnswer
  }
  
  set idAnswer(val: number) {
    this._idAnswer = val
  }
  
  get text() {
    return this._text
  }
  
  set text(val: string) {
    this._text = val
  }

  get isCorrect() {
    return this._isCorrect;
  }

  set isCorrect(val: boolean) {
    this._isCorrect = val;
  }

  toJSON() {
    return {
      id: this._idAnswer,
      text: this._text,
      isCorrect: this._isCorrect,
    }
  }
}