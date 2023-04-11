export interface SessionTokenProps {
  userId: string;
  expireDate: Date;
}

export default interface Hashing {
  hash(parameter?: string): string;
  sessionToken(parameters: SessionTokenProps): string | null;
  compare(value1: string, value2: string): boolean;
  verifySessionToken(token: string): boolean;
  hashId(parameter?: string): string;
}