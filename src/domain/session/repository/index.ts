import Session from "@/domain/session/entity";

export default interface SessionRepository {
  createSession(): Promise<Session | Error>
  updateSession(): Promise<Session | Error>
}