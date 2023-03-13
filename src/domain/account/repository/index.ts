import Account from "@/domain/account/entity";
import Statement from "@/domain/account/entity/statement";

export interface AccountRepository {
  getAccountById(id: string): Promise<Account | Error>
  getAccountByUserId(id: string): Promise<Account | Error>
  createAccount(account: Account, userId: string): Promise<boolean | Error>
  updateBalance(account: Account): Promise<boolean | Error>
  addStatements(account: Account, statement: Statement): Promise<boolean | Error>
  listStatementsByAccountId(id: string): Promise<Account | Error>
}