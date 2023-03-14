import Account from "@/domain/account/entity";
import Statement from "@/domain/account/entity/statement";

export interface AccountRepository {
  getAccountById(id: string): Promise<Account>
  getAccountByUserId(id: string): Promise<Account>
  createAccount(account: Account, userId: string): Promise<boolean>
  updateBalance(account: Account): Promise<boolean>
  addStatements(account: Account, statement: Statement): Promise<boolean>
  listStatementsByAccountId(id: string): Promise<Account>
}