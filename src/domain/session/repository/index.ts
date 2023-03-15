import Session from "@/domain/session/entity";

export default interface SessionRepository {
  createSession(): Promise<Session>
  updateSessionToken(idSession: string, token: string): Promise<Session>
  getSessionByUser(userId: string): Promise<Session>
  delete(idSession: string): void
}