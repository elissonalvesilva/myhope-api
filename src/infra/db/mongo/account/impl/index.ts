import Account from "@/domain/account/entity";
import Statement from "@/domain/account/entity/statement";
import AccountMapper from "@/domain/account/mapper";
import { AccountRepository } from "@/domain/account/repository";
import AccountModel from "@/infra/db/mongo/account/model";

export default class AccountImplementation implements AccountRepository {
  async getAccountById(id: string): Promise<Account | null> {
    try {
      const response = await AccountModel.findById(id);
      if(!response) {
        return null;
      }
      const mapper = new AccountMapper();

      const account = mapper.toDomain(response)
      return account;
    } catch (error) {
      throw error;
    }
  }
  async getAccountByUserId(id: string): Promise<Account | null>{
    try {
      const response = await AccountModel.findOne({ 'user.id': id });
      if(!response) {
        return null;
      }
      const mapper = new AccountMapper();

      const account = mapper.toDomain(response)
      return account;
    } catch (error) {
      throw error;
    }
  }
  async createAccount(account: Account, userId: string): Promise<boolean>{
    try {
      const response = await AccountModel.create(account)
      if(!response.isModified) {
        return false;
      }
      return true
    } catch (error) {
      throw error;
    }
  }
  async updateBalance(account: Account): Promise<boolean>{
    try {
      const response = await AccountModel.updateOne({
        id: account.id,
      }, {
        balance: account.balance,
      })
      if(response.modifiedCount <= 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  async addStatements(account: Account, statement: Statement): Promise<boolean>{
    try {
      const response = await AccountModel.updateOne({
        id: account.id,
      }, {
        $push: { statements: statement },
      });

      if(response.modifiedCount <= 0) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }  
  }

  async listStatementsByAccountId(id: string): Promise<Account | null>{
    try {
      const response = await AccountModel.findOne({ id });
      if(!response) {
        return null;
      }
      const mapper = new AccountMapper();

      const account = mapper.toDomain(response)
      return account;
    } catch (error) {
      throw error;
    }
  }
}