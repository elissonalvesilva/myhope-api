import { AccountRepository } from "@/domain/account/repository";
import Account from "@/domain/account/entity";
import Statement from "@/domain/account/entity/statement";
import { faker } from "@faker-js/faker";
import User from "@/domain/user/entity";
import AccountApplication from "@/app/account/user-case";
import Hashing from "@/app/protocols/hashing";

const fakeAccount = (): Account => {
  return new Account(
    faker.datatype.uuid(),
    faker.datatype.uuid(),
    0,
  )
}

const user = {
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'pass',
}

const makeHashing = (): Hashing => {
  class HashingStub implements Hashing {
    hash(parameter?: string | undefined): string {
      return 'asd'
    }
  }

  return new HashingStub();
};

const makeAccountRepository = (): AccountRepository => {
  class AccountRepositoryStub implements AccountRepository {
    getAccountById(id: string): Promise<Account> {
      return Promise.resolve(fakeAccount())
    }
    getAccountByUserId(id: string): Promise<Account> {
      return Promise.resolve(fakeAccount())
    }
    createAccount(account: Account, userId: string): Promise<boolean> {
      return Promise.resolve(true);
    }
    updateBalance(account: Account): Promise<boolean> {
      return Promise.resolve(true);
    }
    addStatements(account: Account, statement: Statement): Promise<boolean> {
      return Promise.resolve(true);
    }
    listStatementsByAccountId(id: string): Promise<Account> {
      return Promise.resolve(fakeAccount())
    }
  }
  return new AccountRepositoryStub();
}

type SutType = {
  accountRepository: AccountRepository,
  hashing: Hashing,
  sut: AccountApplication,
}

const makeSut = (): SutType => {
  const accountRepository = makeAccountRepository();
  const hashing = makeHashing();
  const sut = new AccountApplication(
    hashing,
    accountRepository
  )

  return {
    accountRepository,
    hashing,
    sut,
  }
}

describe('Account UseCase', () => {
  test('should call with correct params', async () => {
    const {
      accountRepository,
      hashing,
      sut,
    } = makeSut();
    const fk = fakeAccount();

    jest.useFakeTimers().setSystemTime(new Date(2020, 9, 1, 7));

    jest.spyOn(accountRepository, 'getAccountByUserId')
      .mockResolvedValueOnce(
        fk,
      )
    
    jest.spyOn(hashing, 'hash').mockReturnValueOnce('123');
    
    const spyUpdate = jest.spyOn(accountRepository, 'updateBalance');
    const spyAddStatements = jest.spyOn(accountRepository, 'addStatements');

    const response = await sut.updateUserBalance(fk.id, 10)
      
    fk.balance = 10;
    expect(spyUpdate).toHaveBeenCalledWith(
      fk,
    )
    
    const statement = new Statement(
      '123',
      new Date(2020, 9, 1, 7),
      (10).toString(),
    )

    expect(spyAddStatements).toHaveBeenCalledWith(
      fk,
      statement,
    )
    
    expect(response).toBeTruthy();
  });
});