import Hashing from "@/app/protocols/hashing";
import Session from "@/domain/session/entity";
import SessionRepository from "@/domain/session/repository";
import User from "@/domain/user/entity";
import SessionApplication from "@/app/session/use-case";

describe('SessionApplication', () => {
  let sessionApplication: SessionApplication;
  let sessionRepository: SessionRepository;

  beforeEach(() => {
    sessionRepository = {
      createSession: jest.fn(),
      updateSessionToken: jest.fn(),
      getSessionByUser: jest.fn(),
      delete: jest.fn(),
    };
    sessionApplication = new SessionApplication({} as Hashing, sessionRepository);
  });

  describe('createSession', () => {
    it('should call sessionRepository.createSession', async () => {
      const user = {} as User;
      await sessionApplication.createSession(user);
      expect(sessionRepository.createSession).toHaveBeenCalled();
    });
  });

  describe('updateSession', () => {
    it('should call sessionRepository.updateSessionToken', async () => {
      const idSession = 'idSession';
      const userId = 'userId';
      await sessionApplication.updateSession(idSession, userId);
      expect(sessionRepository.updateSessionToken).toHaveBeenCalledWith(idSession, '');
    });
  });

  describe('getSession', () => {
    it('should call sessionRepository.getSessionByUser', async () => {
      const userId = 'userId';
      await sessionApplication.getSession(userId);
      expect(sessionRepository.getSessionByUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('deleteSession', () => {
    it('should call sessionRepository.delete', async () => {
      const id = 'id';
      await sessionApplication.deleteSession(id);
      expect(sessionRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('validateSession', () => {
    it('should return true if session.expireDate > currentSession.expireDate', async () => {
      const currentSession = new Session('2', 'token', 123456780);
      const userId = 'userId';
      const session = new Session('1', 'token', 123456790);
      sessionRepository.getSessionByUser = jest.fn().mockResolvedValue(session);
      const result = await sessionApplication.validateSession(currentSession, userId);
      expect(result).toBe(true);
    });

    it('should return false if session.expireDate <= currentSession.expireDate', async () => {
      const currentSession = new Session('2', 'token', 123456790);
      const userId = 'userId';
      const session = new Session('1', 'token', 123456780);
      sessionRepository.getSessionByUser = jest.fn().mockResolvedValue(session);
      const result = await sessionApplication.validateSession(currentSession, userId);
      expect(result).toBe(false);
    });
  });
});