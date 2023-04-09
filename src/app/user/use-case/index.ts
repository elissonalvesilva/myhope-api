import { Result } from "true-myth";
import AccountFactory from "@/domain/account/factory";
import { AccountRepository } from "@/domain/account/repository";
import UserRepository from "@/domain/user/repository";
import Hashing from "@/app/protocols/hashing";
import User, { UserResponse } from "@/domain/user/entity";
import AccountService from "@/domain/account/services/account-number";
import UserError from "@/app/user/error";
import { UserCreatedResponseDTO } from "@/app/user/dtos";
import Cryptography from "@/app/protocols/cryptography";


export default class UserApplication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly hashingId: Hashing,
    private readonly encrypt: Cryptography,
  ){}

  async getUserById(id: string): Promise<Result<UserResponse, UserError>> {
    const response = await this.userRepository.getUserById(id);
    if(!response) {
      return Result.err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found"
      }));
    }
    return Result.ok(response);
  }

  async getUserByEmail(email: string): Promise<Result<UserResponse, UserError>> {
    const response = await this.userRepository.getUserByEmail(email);
    if(!response) {
      return Result.err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found",
        cause: { email }
      }));
    }
    return Result.ok(response);
  }

  async getResetCode(id: string): Promise<Result<number, UserError>> {
    const code = await this.userRepository.getResetCodeByUserId(id);
    if(!code) {
      return Result.err(new UserError({
        name: "ERR_RESET_CODE_USER_NOT_FOUND",
        message: "reset code not found for this user",
      }))
    }
    return Result.ok(code);
  }

  async createUser(user: User): Promise<Result<UserCreatedResponseDTO, UserError>> {
    const alreadyExists = await this.userRepository.getUserByEmail(user.email);
    if(!alreadyExists) {
      return Result.err(new UserError({
        name: "ERR_USER_ALREADY_EXISTS",
        message: "user with this email already exists",
        cause: `${user.email} already in database`,
      }));
    }
  
    const userCreated = await this.userRepository.createUser(user);
    if(!userCreated) {
      return Result.err(new UserError({
        name: "ERR_USER_NOT_CREATED",
        message: "user cant be created",
      }));
    }

    const accountNumber = AccountService.accountNumber();
    const accountId = this.hashingId.hash();
    const buildedAccount = AccountFactory.create(
      accountId,
      accountNumber,
      0,
    );

    const account = await this.accountRepository.createAccount(buildedAccount, userCreated.id);
    if(!account) {
      return Result.err(new UserError({
        name: "ERR_CREATE_ACCOUNT",
        message: "error to create account"
      }));
    }

    const userResponse: UserCreatedResponseDTO = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      account: {
        id: accountId,
        accountNumber,
        balance: 0,
      },
      status: user.status,
    } 

    return Result.ok(userResponse);
  }

  async resetPassword(userId: string, newPassword: string): Promise<Result<boolean, UserError>> {
    const user = await this.userRepository.getUserById(userId);
    if(!user) {
      return Result.err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found"
      }));
    }

    const encryptedPassword = this.encrypt.encrypt(newPassword);
    const response = await this.userRepository.updatePassword(userId, encryptedPassword);
    if(!response) {
      return Result.err(new UserError({
        name: "ERR_TO_UPDATE_PASSWORD",
        message: "error to update password",
      }));
    }

    return Result.ok(true);
  }
}