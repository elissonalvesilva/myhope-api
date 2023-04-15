import Quiz from "@/domain/quiz/entity";
import { Status } from "@/domain/user/entity";


interface Answers {
  idQuestion: string;
  idSelectedAnswer: number;
}

export interface UserForgotPassword {
  token: string;
}

export interface UserSubmitQuiz {
  idQuiz: string;
  selectedAnswers: Answers[];
}

export interface SubmitQuizResponse {
  totalCorrectResponse: number;
  countQuestions: number;
}

export interface UserCreatedResponseDTO {
  name: string;
  lastName: string;
  email: string;
  image?: string;
  account: {
    id: string,
    accountNumber: string,
    balance: number
  };
  status: Status;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  lastName: string;
  email: string;
  image?: string;
  account?: {
    id?: string,
    accountNumber?: string,
    balance?: number
  };
  status: Status;
  finishedQuizzes?: Quiz[];
}


export default interface UserDTO {
  name: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
  account: {
    id: string,
    accountNumber: string,
    balance: number
  };
  status: Status;
  finishedQuizzes?: Quiz[];
  resetCode: number;
}

export interface UpdateUserProps {
  name?: string;
  lastName?: string;
  email?: string;
  image?: string;
  firstAccess?: boolean;
}