import Account from "@/domain/account/entity";
import Quiz from "@/domain/quiz/entity";


export type Status = 'ACTIVE' | 'INACTIVE' | 'RESET';

export type UserResponse = Omit<User, '_password'>;

export default class User {
  private _id: string;
  private _name: string;
  private _lastName: string;
  private _email: string;
  private _password: string;
  private _image?: string;
  private _account?: Account;
  private _status: Status;
  private _finishedQuizzes?: Quiz[];
  private _resetCode?: number;

  constructor(
    id: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    status: Status = 'ACTIVE',
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._lastName = lastName;
    this._password = password;
    this._status = status;
    this.validate();
  }

  get id() {
    return this._id
  }
  
  set id(val: string) {
    this._id = val
  }
  
  get name() {
    return this._name
  }
  
  set name(val: string) {
    this._name = val
  }
  
  get lastName() {
    return this._lastName
  }
  
  set lastName(val: string) {
    this._lastName = val
  }
  
  get email() {
    return this._email
  }
  
  set email(val: string) {
    this._email = val
  }
  
  get password() {
    return this._password
  }
  
  set password(val: string) {
    this._password = val
  }
  
  get image() {
    return this._image || ''
  }
  
  set image(val: string) {
    this._image = val
  }

  get status() {
    return this._status
  }
  
  set status(val: Status) {
    this._status = val
  }
  
  get finishedQuizzes() {
    return this._finishedQuizzes || []
  }
  
  set finishedQuizzes(val: Quiz[]) {
    this._finishedQuizzes = val
  }

  getResetCode() {
    return this._resetCode ? this._resetCode : null;
  }

  setResetCode(val: number) {
    this._resetCode = val;
  }

  validate() {
    if(this._email.length === 0 ) {
      throw new Error('Email must be pass');
    }

    const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!this._email.toLowerCase().match(re)) {
      throw new Error('Email is invalid');
    }

    if(this._name.length === 0) {
      throw new Error('Name must be pass')
    }

    if(this._lastName.length === 0) {
      throw new Error('LastName must be pass');
    }
  }

  updateStatus(status: Status): void {
    this._status = status
  }

  updateStatusToReset(): void {
    this._status = 'RESET';
  }

  addFinishedQuiz(quiz: Quiz) {
    if(this._finishedQuizzes) {
      this._finishedQuizzes.push(quiz);
    }else {
      this._finishedQuizzes = [quiz];
    }
  }

  sumValueFinishedQuizzes() {
    return this._finishedQuizzes?.reduce((sum: number, quiz: Quiz) => {
      sum = sum + quiz.resultQuiz();
      return sum;
    }, 0);
  }

  addAccount(account: Account) {
    this.validate();
    this._account = account;
  }

  getAccount(): Account | null {
    return this._account ? this._account : null;
  }

  getPassword(): string {
    return this._password;
  }

  setPassword(val: string) {
    this._password = val;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      lastName: this._lastName,
      email: this._email,
      password: this.getPassword(),
      image: this._image,
      account: this.getAccount(),
      status: this._status,
      finishedQuizzes: this.finishedQuizzes,
      resetCode: this.getResetCode(),
    }
  }

}