import { Result, err, ok } from "@/domain/@/shared/result";
import AccountFactory from "@/domain/account/factory";
import { AccountRepository } from "@/domain/account/repository";
import UserRepository from "@/domain/user/repository";
import Hashing from "@/app/protocols/hashing";
import User, { UserResponse } from "@/domain/user/entity";
import AccountService from "@/domain/account/services/account-number";
import UserError from "@/app/user/error";
import { SubmitQuizResponse, UserCreatedResponseDTO, UserSubmitQuiz } from "@/app/user/dtos";
import Cryptography from "@/app/protocols/cryptography";
import QuizRepository from "@/domain/quiz/repository";
import Question from "@/domain/quiz/entity/question";
import Answer from "@/domain/quiz/entity/answer";
import UserMapper from "@/domain/user/mapper";


export default class UserApplication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly hashingId: Hashing,
    private readonly encrypt: Cryptography,
    private readonly quizRespository: QuizRepository,
  ){}

  async getUserById(id: string): Promise<Result<UserResponse, UserError>> {
    const response = await this.userRepository.getUserById(id);
    if(!response) {
      return err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found"
      }));
    }
    return ok(response);
  }

  async getUserByEmail(email: string): Promise<Result<UserResponse, UserError>> {
    const response = await this.userRepository.getUserByEmail(email);
    if(!response) {
      return err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found",
        cause: { email }
      }));
    }
    return ok(response);
  }

  async getResetCode(id: string): Promise<Result<number, UserError>> {
    const code = await this.userRepository.getResetCodeByUserId(id);
    if(!code) {
      return err(new UserError({
        name: "ERR_RESET_CODE_USER_NOT_FOUND",
        message: "reset code not found for this user",
      }))
    }
    return ok(code);
  }

  async createUser(user: User): Promise<Result<UserCreatedResponseDTO, UserError>> {
    const alreadyExists = await this.userRepository.getUserByEmail(user.email);
    if(!alreadyExists) {
      return err(new UserError({
        name: "ERR_USER_ALREADY_EXISTS",
        message: "user with this email already exists",
        cause: `${user.email} already in database`,
      }));
    }
  
    const userCreated = await this.userRepository.createUser(user);
    if(!userCreated) {
      return err(new UserError({
        name: "ERR_USER_NOT_CREATED",
        message: "user cant be created",
      }));
    }

    const accountNumber = AccountService.accountNumber();
    const accountId = this.hashingId.hash();
    const buildedAccount = AccountFactory.create(
      accountId,
      accountNumber,
      0,
    );

    const account = await this.accountRepository.createAccount(buildedAccount, userCreated.id);
    if(!account) {
      return err(new UserError({
        name: "ERR_CREATE_ACCOUNT",
        message: "error to create account"
      }));
    }

    const userResponse: UserCreatedResponseDTO = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      account: {
        id: accountId,
        accountNumber,
        balance: 0,
      },
      status: user.status,
    } 

    return ok(userResponse);
  }

  async resetPassword(userId: string, newPassword: string): Promise<Result<boolean, UserError>> {
    const user = await this.userRepository.getUserById(userId);
    if(!user) {
      return err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found"
      }));
    }

    const encryptedPassword = this.encrypt.encrypt(newPassword);
    const response = await this.userRepository.updatePassword(userId, encryptedPassword);
    if(!response) {
      return err(new UserError({
        name: "ERR_TO_UPDATE_PASSWORD",
        message: "error to update password",
      }));
    }

    return ok(true);
  }

  async submitQuiz(userId: string, quizSubmited: UserSubmitQuiz): Promise<Result<SubmitQuizResponse, UserError>> {
    const user = await this.userRepository.getUserById(userId);
    if(!user) {
      return err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found"
      }));
    }

    const quiz = await this.quizRespository.getQuizById(quizSubmited.idQuiz);
    if(!quiz) {
      return err(new UserError({
        name: "ERR_SUBMITED_QUIZ_NOT_FOUND",
        message: "quiz not found"
      }));
    }

    const lengthQuestions = quiz.questions.length;
    const submitQuizAnswersMap = new Map();
    
    quizSubmited.selectedAnswers.map((quiz) => {
      return submitQuizAnswersMap.set(quiz.idQuestion, quiz.idSelectedAnswer);
    });

    const countCorrectAnswers = quiz.questions.reduce((acc: number, question: Question) => {
      const selectedAnswerQuestion = submitQuizAnswersMap.get(question.id);
      if(selectedAnswerQuestion) {
        if(selectedAnswerQuestion === question.correctAnswer.id) {
          acc++;
        }

        const answer = question.answers.find((answer) => answer === selectedAnswerQuestion);
        if(answer) {
          question.addSelectedAnswer(answer)
        }
      }
      return acc;
    }, 0);


    const mapper = new UserMapper();
    const userMappedDomain = mapper.toDomain(user);
    
    userMappedDomain.addFinishedQuiz(quiz);
    await this.userRepository.updateUser(userMappedDomain)

    return ok({
      totalCorrectResponse: countCorrectAnswers,
      countQuestions: lengthQuestions,
    })
  }
}