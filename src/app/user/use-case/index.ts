import { Result, err, ok } from "@/domain/@/shared/result";
import AccountFactory from "@/domain/account/factory";
import { AccountRepository } from "@/domain/account/repository";
import UserRepository from "@/domain/user/repository";
import Hashing from "@/app/protocols/hashing";
import User from "@/domain/user/entity";
import AccountService from "@/domain/account/services/account-number";
import UserError from "@/app/user/error";
import { SubmitQuizResponse, UserCreatedResponseDTO, UserSubmitQuiz, UserResponseDTO, UserForgotPassword, UpdateUserProps, RankingProps, RankingResponse } from "@/app/user/dtos";
import Cryptography from "@/app/protocols/cryptography";
import QuizRepository from "@/domain/quiz/repository";
import Question from "@/domain/quiz/entity/question";
import UserMapper from "@/domain/user/mapper";
import EmailService from "@/app/protocols/email";


export default class UserApplication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly hashingId: Hashing,
    private readonly encrypt: Cryptography,
    private readonly quizRespository: QuizRepository,
    private readonly emailService: EmailService,
  ){}

  async getUserById(id: string): Promise<Result<UserResponseDTO, UserError>> {
    const response = await this.userRepository.getUserById(id);
    if(!response) {
      return err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found"
      }));
    }

    const user: UserResponseDTO = {
      id: response.id,
      name: response.name,
      lastName: response.lastName,
      account: {
        id: response.getAccount()?.id,
        accountNumber: response.getAccount()?.accountNumber,
        balance: response.getAccount()?.balance
      },
      email: response.email,
      status: response.status,
      image: response.image,
      finishedQuizzes: response.finishedQuizzes,
      firstAccess: response.firstAccess,
    }

    return ok(user);
  }

  async getUserByEmail(email: string): Promise<Result<UserResponseDTO, UserError>> {
    const response = await this.userRepository.getUserByEmail(email);
    if(!response) {
      return err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found",
        cause: { email }
      }));
    }

    const user: UserResponseDTO = {
      id: response.id,
      name: response.name,
      lastName: response.lastName,
      account: {
        id: response.getAccount()?.id,
        accountNumber: response.getAccount()?.accountNumber,
        balance: response.getAccount()?.balance
      },
      email: response.email,
      status: response.status,
      image: response.image,
      finishedQuizzes: response.finishedQuizzes,
      firstAccess: response.firstAccess,
    }
    return ok(user);
  }

  async getResetCode(resetCode: number, email: string): Promise<Result<number, UserError>> {
    const code = await this.userRepository.getResetCodeByUserEmail(resetCode, email);
    if(!code) {
      return err(new UserError({
        name: "ERR_RESET_CODE_USER_NOT_FOUND",
        message: "reset code not found for this user",
      }))
    }
    return ok(code);
  }

  async createUser(user: User): Promise<Result<UserCreatedResponseDTO, UserError>> {
    user.firstAccess = true;
    const alreadyExists = await this.userRepository.getUserByEmail(user.email);
    if(alreadyExists) {
      return err(new UserError({
        name: "ERR_USER_ALREADY_EXISTS",
        message: "user with this email already exists",
        cause: `${user.email} already in database`,
      }));
    }

    const accountNumber = AccountService.accountNumber();
    const accountId = this.hashingId.hashId();
    const buildedAccount = AccountFactory.create(
      accountId,
      accountNumber,
      0,
      user.id,
    );

    const account = await this.accountRepository.createAccount(buildedAccount, user.id);

    if(!account) {
      return err(new UserError({
        name: "ERR_CREATE_ACCOUNT",
        message: "error to create account"
      }));
    }

    user.addAccount(account);
    const userCreated = await this.userRepository.createUser(user);
    if(!userCreated) {
      return err(new UserError({
        name: "ERR_USER_NOT_CREATED",
        message: "user cant be created",
      }));
    }

    await this.emailService.sendWelcome(user.email, user.name);

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

  async resetPassword(email: string, newPassword: string, resetCode: number): Promise<Result<boolean, UserError>> {
    const user = await this.userRepository.getUserByEmail(email);
    if(!user) {
      return err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found",
        cause: { email }
      }));
    }

    if(user.getResetCode() !== resetCode) {
      return err(new UserError({
        name: "ERR_INVALID_RESET_CODE",
        message: "invalid user to reset",
        cause: { email }
      }));
    }

    const encryptedPassword = this.encrypt.encrypt(newPassword);
    const response = await this.userRepository.updatePassword(user.id, encryptedPassword);
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
    const submitQuizAnswersMap: Map<string, number> = new Map();
    
    quizSubmited.selectedAnswers.map((quiz) => {
      return submitQuizAnswersMap.set(quiz.idQuestion, quiz.idSelectedAnswer);
    });

    const countCorrectAnswers = quiz.questions.reduce((acc: number, question: Question) => {
      const selectedAnswerQuestion = submitQuizAnswersMap.get(question.id);
      if(selectedAnswerQuestion) {
        if(selectedAnswerQuestion === question.correctAnswer.idAnswer) {
          acc+=question.value;
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

  async forgotPassword(email: string): Promise<Result<UserForgotPassword, UserError>> {
    const response = await this.userRepository.getUserByEmail(email);
    if(!response) {
      return err(new UserError({
        name: "ERR_USER_NOT_FOUND",
        message: "user not found",
        cause: { email }
      }));
    }

    const resetCode = parseInt((Math.floor(Math.random() * 100000) + 100000).toString());
    const mapper = new UserMapper();
    const userDomain = mapper.toDomain(response);
    userDomain.setResetCode(resetCode);
    userDomain.updateStatusToReset();

    const user = await this.userRepository.updateUser(userDomain);
    if(!user) {
      return err(new UserError({
        name: "ERR_TO_SET_RESET_CODE",
        message: "error to set reset code",
        cause: { email }
      }));
    }

    const mailService = await this.emailService.sendResetEmail(email, resetCode);
    if(!mailService) {
      return err(new UserError({
        name: "ERR_TO_SEND_EMAIL_WITH_RESET_CODE",
        message: "error to send reset code",
        cause: { email }
      }));
    }

    const token = this.hashingId.sessionToken({
      userId: response.id,
      expireDate: new Date(),
      expireIn: 30
    })

    if(!token) {
      return err(new UserError({
        name: "ERR_GENERATE_TOKEN",
        message: "error to generate token",
      }));
    }

    return ok({
      token,
    });
  }

  async validateResetToken(token: string): Promise<Result<boolean, UserError>> {
    const isValid = this.hashingId.verifySessionToken(token);
    if(!isValid) {
      return err(new UserError({
        name: "ERR_INVALID_RESET_TOKEN",
        message: "invalid reset token or token is expired",
      }));
    }

    return ok(true);
  }

  async updateUser(params: UpdateUserProps, userId: string): Promise<Result<boolean, UserError>> {
    const isUpdated = await this.userRepository.updatePartialUser(params, userId);
    if(!isUpdated) {
      return err(new UserError({
        name: "ERR_UPDATE_USER",
        message: "Erro to update user",
      }));
    }

    return ok(true);
  }

  async ranking(params: RankingProps): Promise<Result<RankingResponse, UserError>>{
    const responseUserRanking =  await this.userRepository.listUsersRanking(params);
    if(responseUserRanking === null) {
      return err(new UserError({
        name: "ERR_TO_GET_RANKING",
        message: "Erro to ranking users",
      }));
    }

    const { users, total, page } = responseUserRanking;

    const mapUsers = users.map((user: any) => {
      return {
        id: user.id,
        name: user.name,
        balance: user.getAccount()?.balance || 0,
        image: user.image,
      }
    })


    const map: RankingResponse = {
      users: mapUsers,
      page: page,
      total: total,
    }

    return ok(map);
  }
}