import Hashing from "@/app/protocols/hashing";
import Session from "@/domain/session/entity";
import SessionRepository from "@/domain/session/repository";
import User from "@/domain/user/entity";
import { Result } from "true-myth";
import { SessionResponseDTO } from "@/app/session/dto";
import SessionError from "@/app/session/error";
import UserRepository from "@/domain/user/repository";
import Cryptography from "@/app/protocols/cryptography";

export default class SessionApplication {
  constructor(
    private readonly hashing: Hashing,
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository,
    private readonly crypto: Cryptography,
  ){}

  async createSession(userId: string): Promise<Result<SessionResponseDTO, SessionError>> {
    const session = await this.sessionRepository.createSession(userId);
    if(!session) {
      return Result.err(new SessionError({
        name: "ERR_CREATE_SESSION",
        message: "error to create session",
      }));
    }

    const sessionResponse: SessionResponseDTO = {
      id: session.id,
      token: session.token,
      expiredDate: session.expireDate,
      userId: session.userId,
    };

    return Result.ok(sessionResponse)
  }

  async updateSession(idSession: string, userId: string): Promise<Session> {
    // TODO: need to creata a update session with token
    try {
      return await this.sessionRepository.updateSessionToken(idSession, userId);
    } catch (error) {
      throw error;
    }
  }

  async getSession(userId: string): Promise<Result<SessionResponseDTO, SessionError>> {
    const session = await this.sessionRepository.getActiveSessionByUser(userId);
    if(!session) {
      return Result.err(new SessionError({
        name: "ERR_NOT_FOUND_SESSION",
        message: "not found session",
      }))
    }

    const sessionResponse: SessionResponseDTO = {
      id: session.id,
      token: session.token,
      expiredDate: session.expireDate,
      userId: session.userId,
    };

    return Result.ok(sessionResponse);
  }

  async deleteSession(id: string): Promise<void> {
    await this.sessionRepository.delete(id);
  }

  async validateSession(currentSession: Session): Promise<Result<boolean, SessionError>> {
    const session = await this.sessionRepository.getActiveSessionByUser(currentSession.userId);
    if(!session) {
      return Result.err(new SessionError({
        name: "ERR_NOT_FOUND_SESSION",
        message: "not found session for this user",
      }))
    }
      
    if(session.expireDate > currentSession.expireDate) {
      return Result.ok(true);
    }

    return Result.err(new SessionError({
      name: "ERR_INVALID_SESSION",
      message: "invalid session for this user",
    }))
  }

  async getSessionByToken(token: string): Promise<Result<SessionResponseDTO, SessionError>> {
    const session = await this.sessionRepository.getByToken(token);
    if(!session) {
      return Result.err(new SessionError({
        name: "ERR_NOT_FOUND_SESSION",
        message: "not found session",
      }))
    }

    const sessionResponse: SessionResponseDTO = {
      id: session.id,
      token: session.token,
      expiredDate: session.expireDate,
      userId: session.userId,
    };

    return Result.ok(sessionResponse);
  }

  async signIn(email: string, password: string): Promise<Result<SessionResponseDTO, SessionError>> {
    const user = await this.userRepository.getUserByEmail(email);
    if(!user) {
      return Result.err(new SessionError({
        name: "ERR_USER_OR_PASSWORD_IS_INVALID",
        message: "user or password is invalid",
      }))
    }

    const encrytedPassword = this.crypto.encrypt(password);
    if(!this.crypto.compare(encrytedPassword, user.getPassword())) {
      return Result.err(new SessionError({
        name: "ERR_USER_OR_PASSWORD_IS_INVALID",
        message: "user or password is invalid",
      }))
    }

    const session = await this.sessionRepository.createSession(user.id);
    if(!session) {
      return Result.err(new SessionError({
        name: "ERR_CREATE_SESSION",
        message: "error to create session",
      }));
    }

    const sessionResponse: SessionResponseDTO = {
      id: session.id,
      token: session.token,
      expiredDate: session.expireDate,
      userId: session.userId,
    };

    return Result.ok(sessionResponse)
  }
}