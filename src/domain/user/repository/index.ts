import User from "@/domain/user/entity";

export default interface UserRepository {
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getResetCodeByUserId(id: string): Promise<number | null>
  createUser(user: User): Promise<User | null>
  updateUser(user: User): Promise<boolean>
  updatePassword(id: string, password: string): Promise<boolean>
}

