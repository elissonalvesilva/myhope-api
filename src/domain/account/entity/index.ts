import Statement from "@/domain/account/entity/statement";

export default class Account {
  private _id: string;
  private _accountNumber: string;
  private _balance: number;
  private _statements?: Statement[];

  constructor(
    id: string,
    accountNumber: string,
    balance: number,
  ) {
    this._id = id;
    this._accountNumber = accountNumber;
    this._balance = balance;

    this.validate();
  }

  get id() {
    return this._id
  }
  
  set id(val: string) {
    this._id = val
  }
  
  get accountNumber() {
    return this._accountNumber
  }
  
  set accountNumber(val: string) {
    this._accountNumber = val
  }
  
  get balance() {
    return this._balance
  }
  
  set balance(val: number) {
    this._balance = val
  }
  
  get statements() {
    return this._statements || []
  }
  
  set statements(val: Statement[]) {
    this._statements = val
  }

  addStatement(val: Statement) {
    this._statements?.push(val);
  }

  validate(): void {
    if(this._accountNumber.length === 0) {
      throw new Error('account number must be pass');
    }
  }

  toJSON() {
    return {
      id: this._id,
      accountNumber: this._accountNumber,
      balance: this._balance,
      statements: this._statements?.map((statement) => statement.toJSON()),
    }
  }
}