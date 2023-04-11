import Mapper from "@/domain/@/shared/domain/mapper";
import Account from "@/domain/account/entity";
import Statement from "@/domain/account/entity/statement";

export default class AccountMapper implements Mapper<Account> {
  toDomain(raw: any): Account {
    const account = new Account(
      raw.id,
      raw.accountNumber,
      raw.balance
    )

    if(raw?.statements.length > 0) {
      account.statements = raw.statements.map((statement: any) => {
        return new Statement(
          statement.id,
          statement.date,
          statement.content,
          raw.id,
        )
      });
    }

    return account;
  }
  toPersistence(t: Account) {
    return {
      id: t.id,
      balance: t.balance,
      accountNumber: t.accountNumber,
      statements: t.statements.map((statement) => statement.id),
    }
  }

}