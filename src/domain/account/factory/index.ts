import Account from "@/domain/account/entity";

export default class AccountFactory {
  static create(id: string, accountNumber: string, balance: number): Account {
    return new Account(
      id,
      accountNumber,
      balance,
    )
  }
}