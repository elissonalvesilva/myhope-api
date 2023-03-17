import Mapper from "@/domain/@/shared/domain/mapper";
import User from "@/domain/user/entity";

export default class UserMapper implements Mapper<User> {
  constructor() {}
  toDomain(raw: any): User {
    return new User(
      raw.id,
      raw.name,
      raw.lastName,
      raw.email,
      raw.password,
      raw.status
    )
  }


  toPersistence (t: User): any {
    return true;
  }
}