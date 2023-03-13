export default class Answer {
  private _id: number;
  private _text: string;

  constructor(id: number, text: string) {
    this._id = id;
    this._text = text;
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
}