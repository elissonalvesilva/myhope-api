import Hashing from "@/app/protocols/hashing";
import Statement from "@/domain/account/entity/statement";
import { AccountRepository } from "@/domain/account/repository";

export default class AccountApplication {
  constructor(
    private readonly hashing: Hashing,
    private readonly accountRepository: AccountRepository,
  ){}

  async updateUserBalance(userId: string, value: number): Promise<boolean> {
    try {
      const account = await this.accountRepository.getAccountByUserId(userId);
      account.balance = account.balance + value;
      await this.accountRepository.updateBalance(account);
      
      const statement = new Statement(
        this.hashing.hash(),
        new Date(),
        value.toString(),
      );

      await this.accountRepository.addStatements(account, statement);
      return true;
    } catch (error) {
      throw error;
    }
  } 
}