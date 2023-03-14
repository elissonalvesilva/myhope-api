import User from "@/domain/user/entity";

export default interface UserRepository {
  getUserById(id: string): Promise<User | Error>
  getUserByEmail(email: string): Promise<User | Error>
  getResetCodeByUserId(id: string): Promise<number | Error>
  createUser<T>(user: User): Promise<T>
  updateUser(user: User): Promise<boolean | Error>
  updatePassword(id: string, password: string): Promise<boolean | Error>
}

