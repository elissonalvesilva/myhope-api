import User, { UserResponse } from "@/domain/user/entity";

export default interface UserRepository {
  getUserById(id: string): Promise<UserResponse | null>
  getUserByEmail(email: string): Promise<UserResponse | null>
  getResetCodeByUserEmail(resetCode: number, email: string): Promise<number | null>
  createUser(user: User): Promise<UserResponse | null>
  updateUser(user: User): Promise<boolean>
  updatePartialUser(params: any, userId: string): Promise<boolean | null>
  updatePassword(id: string, password: string): Promise<boolean>
}

