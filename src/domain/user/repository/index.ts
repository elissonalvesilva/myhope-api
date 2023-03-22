import User, { UserProps } from "@/domain/user/entity";

export default interface UserRepository {
  getUserById(id: string): Promise<UserProps | null>
  getUserByEmail(email: string): Promise<UserProps | null>
  getResetCodeByUserId(id: string): Promise<number | null>
  createUser(user: User): Promise<UserProps | null>
  updateUser(user: User): Promise<boolean>
  updatePassword(id: string, password: string): Promise<boolean>
}

