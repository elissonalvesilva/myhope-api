import Mapper from "@/domain/@/shared/domain/mapper";
import User from "@/domain/user/entity";

export default class UserMapper implements Mapper<User> {
  constructor() {}
  toDomain(raw: any): User {
    const user = new User(
      raw.id,
      raw.name,
      raw.lastName,
      raw.email,
      raw.password,
      raw.status
    )

    if(raw.finishedQuizzes){
      user.finishedQuizzes = raw.finishedQuizzes;
    }

    return user;
  }


  toPersistence (t: User): any {
    return {
      id: t.id,
      name: t.name,
      lastName: t.lastName,
      email: t.email,
      password: t.getPassword(),
      image: t.image,
      status: t.status,
      account: t.getAccount()?.id,
      finishedQuizzes: t.finishedQuizzes.map((f) => f.id),
    }
  }
}