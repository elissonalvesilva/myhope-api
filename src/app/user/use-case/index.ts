import AccountFactory from "@/domain/account/factory";
import { AccountRepository } from "@/domain/account/repository";
import User from "@/domain/user/entity";
import UserRepository from "@/domain/user/repository";
import { UserInfo } from "@/app/user/protocols";
import Hashing from "@/app/protocols/hashing";
import AccountService from "@/domain/account/services/account-number";


export default class UserApplication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly hashingId: Hashing,
  ){}

  async getUserById(id: string): Promise<User | Error> {
    return await this.userRepository.getUserById(id)
  }

  async getUserByEmail(email: string): Promise<User | Error> {
    return await this.userRepository.getUserByEmail(email)
  }

  async getResetCode(id: string): Promise<number | Error> {
    return await this.userRepository.getResetCodeByUserId(id);
  }

  async createUser(user: User): Promise<boolean> {
    try {
      const userCreated = await this.userRepository.createUser<UserInfo>(user);
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