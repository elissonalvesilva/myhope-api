import Hashing from "@/app/protocols/hashing";
import Session from "@/domain/session/entity";
import SessionRepository from "@/domain/session/repository";
import User from "@/domain/user/entity";

export default class SessionApplication {
  constructor(
    private readonly hashing: Hashing,
    private readonly sessionRepository: SessionRepository,
  ){}

  async createSession(user: User): Promise<Session> {
    try {
      return await this.sessionRepository.createSession();
    } catch (error) {
      throw error;
    }
  }

  async updateSession(idSession: string, userId: string): Promise<Session> {
    try {
      return await this.sessionRepository.updateSessionToken(idSession, '');
    } catch (error) {
      throw error;
    }
  }

  async getSession(userId: string): Promise<Session> {
    try {
      return await this.sessionRepository.getSessionByUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async deleteSession(id: string): Promise<void> {
    try {
      await this.sessionRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async validateSession(currentSession: Session, userId: string): Promise<boolean> {
    try{
      const session = await this.sessionRepository.getSessionByUser(userId);
      if(session.expireDate > currentSession.expireDate) {
        return true
      }
      return false;
    }catch(error) {
      throw error;
    }
  }
}