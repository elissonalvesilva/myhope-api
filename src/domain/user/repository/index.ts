import User from "@/domain/user/entity";

export default interface UserRepository {
  getUserById(id: string): Promise<User>
  getUserByEmail(email: string): Promise<User>
  getResetCodeByUserId(id: string): Promise<number>
  createUser(user: User): Promise<User>
  updateUser(user: User): Promise<boolean>
  updatePassword(id: string, password: string): Promise<boolean>
}

