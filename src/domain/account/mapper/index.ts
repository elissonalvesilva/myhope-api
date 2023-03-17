import Mapper from "@/domain/@/shared/domain/mapper";
import Account from "@/domain/account/entity";

export default class AccountMapper implements Mapper<Account> {
  toDomain(raw: any): Account {
    throw new Error("Method not implemented.");
  }
  toPersistence(t: Account) {
    throw new Error("Method not implemented.");
  }

}