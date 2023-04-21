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
  firstAccess?: boolean;
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
  firstAccess?: boolean;
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
  firstAccess?: boolean;
}

export interface UpdateUserProps {
  name?: string;
  lastName?: string;
  email?: string;
  image?: string;
  firstAccess?: boolean;
}

export interface RankingProps {
  limit: Number;
  page: Number;
}

interface UserRanking {
  id: string;
  name: string;
  balance: number;
}

export interface RankingResponse {
  users: UserRanking[];
  page: number;
  total: number;
}