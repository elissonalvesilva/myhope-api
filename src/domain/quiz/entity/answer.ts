export default class Answer {
  private _id: number;
  private _text: string;
  private _isCorrect: boolean = false;

  constructor(id: number, text: string, isCorrect: boolean = false) {
    this._id = id;
    this._text = text;
    this._isCorrect = isCorrect
  }

  get id() {
    return this._id
  }
  
  set id(val: number) {
    this._id = val
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
}