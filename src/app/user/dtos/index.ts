import Account from "@/domain/account/entity";
import Quiz from "@/domain/quiz/entity";
import { Status } from "@/domain/user/entity";

export default interface UserDTO {
  name: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
  account?: Account;
  status: Status;
  finishedQuizzes?: Quiz[];
  resetCode: number;
}