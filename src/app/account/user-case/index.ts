
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

  async updateUserBalance(userId: string, value: number): Promise<Result<boolean, AccountError>> {
    const account = await this.accountRepository.getAccountByUserId(userId);
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
      this.hashing.hash(),
      new Date(),
      value.toString(),
      account.id,
    );

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