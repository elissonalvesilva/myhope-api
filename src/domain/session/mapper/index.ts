import Mapper from "@/domain/@/shared/domain/mapper";
import Session from "@/domain/session/entity";

export default class SessionMapper implements Mapper<Session> {
  
  toDomain(raw: any): Session {
    return new Session(
      raw.id,
      raw.token,
      raw.expireDate,
      raw.userId,
    )
  }
  
  toPersistence(t: Session) {
    throw new Error("Method not implemented.");
  }
  
}