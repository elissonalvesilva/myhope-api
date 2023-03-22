export default class Answer {
  private _id: number;
  private _text: string;
  private _isCorret: boolean = false;

  constructor(id: number, text: string, isCorret: boolean = false) {
    this._id = id;
    this._text = text;
    this._isCorret = isCorret
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

  get isCorret() {
    return this._isCorret;
  }

  set isCorret(val: boolean) {
    this._isCorret = val;
  }
}