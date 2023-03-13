import User from "@/domain/user/entity";

export default interface UserRepository {
  getUserById(id: string): Promise<User | Error>
  getUserByEmail(email: string): Promise<User | Error>
  createUser(user: User): Promise<boolean | Error>
  updateUser(user: User): Promise<boolean | Error>
  getResetCodeByUserId(id: string): Promise<number | Error>
  updatePassword(id: string, password: string): Promise<boolean | Error>
}