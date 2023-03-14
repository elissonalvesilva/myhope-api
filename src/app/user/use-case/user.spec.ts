import { AccountRepository } from "@/domain/account/repository";
import UserRepository from "@/domain/user/repository";
import Hashing from "@/app/protocols/hashing";
import UserApplication from "@/app/user/use-case";
import Account from "@/domain/account/entity";
import Statement from "@/domain/account/entity/statement";
import { faker } from "@faker-js/faker";
import User from "@/domain/user/entity";
import { UserInfo } from "@/app/user/protocols";

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

const fakeUser = (): User => {
  return new User(
    user.id,
    user.name,
    user.lastName,
    user.email,
    user.password,
  )
}

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

const makeUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    getUserById(id: string): Promise<User> {
      return Promise.resolve(fakeUser());
    }
    getUserByEmail(email: string): Promise<User> {
      return Promise.resolve(fakeUser());
    }
    getResetCodeByUserId(id: string): Promise<number> {
      return Promise.resolve(1234);
    }
    createUser(user: User): Promise<User> {
      return Promise.resolve(fakeUser());
    }
    updateUser(user: User): Promise<boolean> {
      return Promise.resolve(true);
    }
    updatePassword(id: string, password: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }

  return new UserRepositoryStub();
};

const makeHashing = (): Hashing => {
  class HashingStub implements Hashing {
    hash(parameter?: string | undefined): string {
      return 'asd'
    }
  }

  return new HashingStub();
};

interface Sut {
  accountRepository:  AccountRepository,
  userRepository: UserRepository,
  hashing: Hashing,
  sut: UserApplication
}

const makeSut = (): Sut => {
  const accountRepository = makeAccountRepository();
  const userRepository = makeUserRepository();
  const hashing = makeHashing();
  const sut = new UserApplication(
    userRepository,
    accountRepository,
    hashing
  );
  return {
    userRepository,
    accountRepository,
    hashing,
    sut,
  }
}

const throwError = (): never => {
  throw new Error()
}


describe('User UseCase', () => {
  describe('getUserById', () => {
    test('should call with correct params', () => {
      const { sut, userRepository } = makeSut();

      const spy = jest.spyOn(userRepository, 'getUserById')

      sut.getUserById('id');

      expect(spy).toBeCalledWith('id');
      
    });
    test('should throw a error', () => {
      const { sut, userRepository } = makeSut();

      jest.spyOn(userRepository, 'getUserById').mockImplementationOnce(throwError)

      const promise = sut.getUserById('id');
      expect(promise).rejects.toThrow();
    });
  });
  describe('getUserByEmail', () => {
    test('should call with correct params', () => {
      const { sut, userRepository } = makeSut();

      const spy = jest.spyOn(userRepository, 'getUserByEmail')

      sut.getUserByEmail('mail@mail.com');

      expect(spy).toBeCalledWith('mail@mail.com');
      
    });
    test('should throw a error', () => {
      const { sut, userRepository } = makeSut();

      jest.spyOn(userRepository, 'getUserByEmail').mockImplementationOnce(throwError)

      const promise = sut.getUserByEmail('mail@mail.com');
      expect(promise).rejects.toThrow();
    });
  });
  describe('getResetCode', () => {
    test('should call with correct params', () => {
      const { sut, userRepository } = makeSut();

      const spy = jest.spyOn(userRepository, 'getResetCodeByUserId')

      sut.getResetCode('id');

      expect(spy).toBeCalledWith('id');
      
    });
    test('should throw a error', () => {
      const { sut, userRepository } = makeSut();

      jest.spyOn(userRepository, 'getResetCodeByUserId').mockImplementationOnce(throwError)

      const promise = sut.getResetCode('id');
      expect(promise).rejects.toThrow();
    });
  });
  describe('createUser', () => {
    test('should call with correct params', async () => {
      const { sut, userRepository, accountRepository, hashing } = makeSut();
      const fkUser = fakeUser();
      const fkAccount = fakeAccount();

      jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce(
        fkUser
      );

      jest.spyOn(hashing, 'hash').mockReturnValueOnce('123');

      const spyAccountRepository = jest.spyOn(accountRepository, 'createAccount');

      const response = await sut.createUser(fkUser);

      expect(spyAccountRepository).toBeCalledTimes(1)
      expect(response).toBeTruthy();
      
    });
    test('should throw a error', () => {
      const { sut, userRepository, accountRepository, hashing } = makeSut();
      const fkUser = fakeUser();

      jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce(
        fkUser
      );

      jest.spyOn(hashing, 'hash').mockReturnValueOnce('123');

      jest.spyOn(accountRepository, 'createAccount').mockImplementationOnce(throwError)

      const promise = sut.createUser(fkUser);

      expect(promise).rejects.toThrow();
    });
  });
});