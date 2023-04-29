export default class Statement {
  private _id: string;
  private _date: Date;
  private _content: string;
  private _accountId: string;
  private _value?: number;

  constructor(
    id: string,
    date: Date,
    content: string,
    accountId: string,
  ) {
    this._id = id;
    this._date = date;
    this._content = content;
    this._accountId = accountId;
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

  get accountId() {
    return this._accountId;
  }

  set accountId(id: string) {
    this._accountId = id;
  }

  get value() {
    return this._value || 0;
  }

  set value(val: number) {
    this._value = val;
  } 

  toJSON() {
    return {
      id: this._id,
      date: this._date,
      content: this._content,
      accountId: this._accountId,
      value: this._value,
    }
  }
}