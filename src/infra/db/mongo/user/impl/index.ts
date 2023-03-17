import User from "@/domain/user/entity";
import UserMapper from "@/domain/user/mapper";
import UserRepository from "@/domain/user/repository";
import UserModel from "@/infra/db/mongo/user/model";

export default class UserImplementation implements UserRepository {
  constructor(){}

  async getUserById(id: string): Promise<User | null>{
    try {
      const response = await UserModel.findById(id);
      
      if(!response) {
        return null;
      }
      const mapper = new UserMapper();
      const user = mapper.toDomain(
        response,
      )
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await UserModel.findOne({
        email,
      });
      
      if(!response) {
        return null;
      }
      const mapper = new UserMapper();
      const user = mapper.toDomain(
        response,
      )
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getResetCodeByUserId(id: string): Promise<number | null>{
    try {
      const response = await UserModel.findById(id);
      
      if(!response) {
        return null;
      }
      return response.resetCode;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: User): Promise<User | null>{
    try {
      const response = await UserModel.create(user);
      
      if(!response) {
        return null;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(user: User): Promise<boolean>{
    try {
      const response = await UserModel.updateOne({ id: user.id}, user);
      
      if(!response) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(id: string, password: string): Promise<boolean>{
    try {
      const response = await UserModel.updateOne({ id: id }, {
        password,
      });
      
      if(!response) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

}