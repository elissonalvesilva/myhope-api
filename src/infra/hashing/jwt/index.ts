import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import Hashing, { SessionTokenProps } from "@/app/protocols/hashing";

export default class JWTImplemenation implements Hashing {

  constructor(
    private readonly secretKey: string,
    private readonly expireTimeInMinutes: number
  ){}

  hash(parameter?: string | undefined): string {
    let hash = crypto.createHash("sha256");

    if(parameter !== "" && parameter !== undefined) {
      return hash.update(parameter).digest('hex');
    }

    return hash.update(uuidv4()).digest('hex');
  }

  sessionToken(parameters: SessionTokenProps): string | null {
    const token = jwt.sign({
      userId: parameters.userId,
      expireDate: parameters.expireDate,
    }, this.secretKey, { expiresIn: 60 * this.expireTimeInMinutes });

    if(!token) {
      return null;
    }

    return token;
  }

  verifySessionToken(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  compare(value1: string, value2: string): boolean {
    if(value1 === value2) {
      return true
    }

    return false;
  }
}