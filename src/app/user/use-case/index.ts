import AccountFactory from "@/domain/account/factory";
import { AccountRepository } from "@/domain/account/repository";
import UserRepository from "@/domain/user/repository";
import Hashing from "@/app/protocols/hashing";
import User from "@/domain/user/entity";
import AccountService from "@/domain/account/services/account-number";


export default class UserApplication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly hashingId: Hashing,
  ){}

  async getUserById(id: string): Promise<User> {
    try {
      return await this.userRepository.getUserById(id);
    } catch (error) {
      throw error
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.getUserByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async getResetCode(id: string): Promise<number | Error> {
    return await this.userRepository.getResetCodeByUserId(id);
  }

  async createUser(user: User): Promise<boolean> {
    try {
      const userCreated = await this.userRepository.createUser(user);
      const accountNumber = AccountService.accountNumber();
      const accountId = this.hashingId.hash();
      const buildedAccount = AccountFactory.create(
        accountId,
        accountNumber,
        0,
      );

      await this.accountRepository.createAccount(buildedAccount, userCreated.id);
      return true;
    } catch (error) {
      throw error
    }
  }

}