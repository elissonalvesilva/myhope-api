import AccountFactory from "@/domain/account/factory";
import AccountService from "@/domain/account/services/account-number";
import { faker } from "@faker-js/faker";

describe('Account Factory', () => {
  test('should create a account', () => {
    const accountNumber = AccountService.accountNumber();
    const ac = {
      id: faker.datatype.uuid(),
      accountNumber: accountNumber,
      balance: 0,
    }
    const account = AccountFactory.create(
      ac.id,
      ac.accountNumber,
      ac.balance
    );

    expect(account.id).toBe(ac.id);
    expect(account.accountNumber).toBe(ac.accountNumber);
    expect(account.balance).toBe(ac.balance);
  });
});