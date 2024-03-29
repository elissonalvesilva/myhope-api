
import { Result, err, ok } from "@/domain/@/shared/result";
import Hashing from "@/app/protocols/hashing";
import Statement from "@/domain/account/entity/statement";
import { AccountRepository } from "@/domain/account/repository";
import AccountError from "@/app/account/error";

export default class AccountApplication {
  constructor(
    private readonly hashing: Hashing,
    private readonly accountRepository: AccountRepository,
  ){}

  async updateUserBalance(accountId: string, value: number, reason: string): Promise<Result<boolean, AccountError>> {
    const account = await this.accountRepository.getAccountById(accountId);
    if(!account) {
      return err(new AccountError({
        name: "ERR_ACCOUNT_NOT_FOUND",
        message: "account not found",
      }));
    }
    account.balance = account.balance + value;
    const isUpdated = await this.accountRepository.updateBalance(account);
    if(!isUpdated) {
      return err(new AccountError({
        name: "ERR_CANT_UPDATE_BALANCE",
        message: "account not found",
      }));
    }
      
    const statement = new Statement(
      this.hashing.hashId(),
      new Date(),
      reason,
      account.id,
    );

    statement.value = value;

    const resp = await this.accountRepository.addStatements(account, statement);
    if(!resp) {
      return err(new AccountError({
        name: "ERR_TO_ADD_STATEMENT",
        message: "error to add statement",
      }));
    }
    return ok(true);
  } 
}