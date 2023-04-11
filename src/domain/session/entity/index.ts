export default class Session {
  private _id: string;
  private _token: string;
  private _expireDate: Date;
  private _userId: string;

  constructor(id: string, token: string, expireDate: Date, userId: string) {
    this._id = id;
    this._token = token;
    this._expireDate = expireDate;
    this._userId = userId;
  }

  get id() {
    return this._id
  }
  
  set id(val: string) {
    this._id = val
  }
  
  get token() {
    return this._token
  }
  
  set token(val: string) {
    this._token = val
  }
  
  get expireDate() {
    return this._expireDate
  }
  
  set expireDate(val: Date) {
    this._expireDate = val
  }

  get userId(): string {
    return this._userId;
  }

  set userId(val: string) {
    this._userId = val;
  }

  toJSON() {
    return {
      id: this._id,
      token: this._token,
      expireDate: this._expireDate,
      userId: this._userId,
    }
  }
  
}