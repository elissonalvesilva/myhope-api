import AccountService from '@/domain/account/services/account-number';

describe('Account Number Service', () => {
  test('should generate unique account number', () => {
    const service = AccountService;
    
    const accountNumber1 = service.accountNumber()
    const accountNumber2 = service.accountNumber()

    expect(accountNumber1).not.toBe(accountNumber2);
  })
})