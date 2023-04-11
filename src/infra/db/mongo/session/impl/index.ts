import Session from "@/domain/session/entity";
import SessionRepository from "@/domain/session/repository";
import JWTImplemenation from "@/infra/hashing/jwt";
import SessionModel from '@/infra/db/mongo/session/model';
import SessionMapper from "@/domain/session/mapper";

export default class SessionImplementation implements SessionRepository {
  constructor(
    private readonly jwt: JWTImplemenation,
    private readonly expireDateInMinutes: number,
  ) {}

  async createSession(userId: string): Promise<Session | null> {
    try {
      let currentDate = new Date();
      currentDate.setMinutes(currentDate.getMinutes() + this.expireDateInMinutes);
      const expireDate = currentDate;
      const token = this.jwt.sessionToken({
        userId,
        expireDate,
      })
      const session = await SessionModel.create({
        userId,
        token,
        expireDate,
      });

      if(!session) {
        return null;
      }

      const mapper = new SessionMapper();
      const response = {
        id: session.id,
        token,
        expireDate,
      }
      const responseSession = mapper.toDomain(response)

      return responseSession;
    } catch (error) {
      throw error;
    }
  }

  async updateSessionToken(idSession: string, userId: string): Promise<Session> {
    try {
      let currentDate = new Date();
      currentDate.setMinutes(currentDate.getMinutes() + this.expireDateInMinutes);
      const expireDate = currentDate;
      const token = this.jwt.sessionToken({
        userId,
        expireDate,
      })
      const session = await SessionModel.updateOne({ id: idSession, userId }, {
        $set: { token }
      })

      const mapper = new SessionMapper();

      const responseSession = mapper.toDomain(session)

      return responseSession;
    } catch (error) {
      throw error;
    }
    
  }
  async getActiveSessionByUser(userId: string): Promise<Session | null> {
    try {
      const session = await SessionModel.findOne({ userId });
      if(!session) {
        return null;
      }

      const mapper = new SessionMapper();

      const responseSession = mapper.toDomain(session)

      return responseSession;
    } catch (error) {
     throw error; 
    }
  }
  
  async delete(idSession: string): Promise<void> {
    try {
      await SessionModel.findOneAndRemove({ id: idSession });
    } catch (error) {
      throw error;
    }
  }
  
  async getByToken(token: string): Promise<Session | null> {
    try {
      const session = await SessionModel.findOne({ token });
      if(!session) {
        return null;
      }

      const mapper = new SessionMapper();

      const responseSession = mapper.toDomain(session)

      return responseSession;
    } catch (error) {
     throw error; 
    }
  }
}