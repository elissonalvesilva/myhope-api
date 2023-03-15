import Session from "@/domain/session/entity";

describe('Session entity', () => {
  test('Session class should have correct properties and methods', () => {
    const session = new Session('123', 'abc', 1234567890);
  
    // Test constructor
    expect(session.id).toBe('123');
    expect(session.token).toBe('abc');
    expect(session.expireDate).toBe(1234567890);
  
    // Test getters and setters
    session.id = '456';
    expect(session.id).toBe('456');
  
    session.token = 'def';
    expect(session.token).toBe('def');
  
    session.expireDate = 9876543210;
    expect(session.expireDate).toBe(9876543210);
  });
});