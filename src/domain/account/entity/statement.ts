export default class Statement {
  private _id: string;
  private _date: Date;
  private _content: string;

  constructor(
    id: string,
    date: Date,
    content: string
  ) {
    this._id = id;
    this._date = date;
    this._content = content;
  }

  get id() {
    return this._id
  }
  
  set id(val: string) {
    this._id = val
  }
  
  get date() {
    return this._date
  }
  
  set date(val: Date) {
    this._date = val
  }
  
  get content() {
    return this._content
  }
  
  set content(val: string) {
    this._content = val
  }
}