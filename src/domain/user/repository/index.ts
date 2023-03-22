import User, { UserResponse } from "@/domain/user/entity";

export default interface UserRepository {
  getUserById(id: string): Promise<UserResponse | null>
  getUserByEmail(email: string): Promise<UserResponse | null>
  getResetCodeByUserId(id: string): Promise<number | null>
  createUser(user: User): Promise<UserResponse | null>
  updateUser(user: User): Promise<boolean>
  updatePassword(id: string, password: string): Promise<boolean>
}

