import Hashing from "@/app/protocols/hashing";
import Session from "@/domain/session/entity";
import SessionRepository from "@/domain/session/repository";
import User from "@/domain/user/entity";
import { Result } from "true-myth";
import { SessionResponseDTO } from "@/app/session/dto";
import SessionError from "@/app/session/error";

export default class SessionApplication {
  constructor(
    private readonly hashing: Hashing,
    private readonly sessionRepository: SessionRepository,
  ){}

  async createSession(user: User): Promise<Result<SessionResponseDTO, SessionError>> {
    const session = await this.sessionRepository.createSession();
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
    };

    return Result.ok(sessionResponse)
  }

  async updateSession(idSession: string, userId: string): Promise<Session> {
    // TODO: need to creata a update session with token
    try {
      return await this.sessionRepository.updateSessionToken(idSession, '');
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
    };

    return Result.ok(sessionResponse);
  }

  async deleteSession(id: string): Promise<void> {
    await this.sessionRepository.delete(id);
  }

  async validateSession(currentSession: Session, userId: string): Promise<Result<boolean, SessionError>> {
    const session = await this.sessionRepository.getSessionByUser(userId);
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
}