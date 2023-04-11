import Session from "@/domain/session/entity";

export default interface SessionRepository {
  createSession(userId: string): Promise<Session | null>
  updateSessionToken(idSession: string, userId: string): Promise<Session>
  getActiveSessionByUser(userId: string): Promise<Session | null>
  delete(idSession: string): void;
  getByToken(token: string): Promise<Session | null>
}