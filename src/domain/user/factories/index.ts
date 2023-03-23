import User from "@/domain/user/entity";

export default class UserFactory {
  static create({ id, name, lastName, email, password }) {
    return new User(
      id,
      name,
      lastName,
      email,
      password,
    )
  }
}