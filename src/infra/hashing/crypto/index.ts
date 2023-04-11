import crypto from 'crypto';

import Cryptography from "@/app/protocols/cryptography";

export default class Cryto implements Cryptography {
  protected algoritm = "aes-256-gcm";
  
  constructor(
    private readonly secretKey: string,
    private readonly initVector: string,
  ){}

  encrypt(str: string): string {
    let hash = crypto.createCipheriv(this.algoritm, Buffer.from(this.secretKey, 'hex'), Buffer.from(this.initVector, 'hex'));
    let encryptedData = hash.update(str, "utf-8", "hex");

    encryptedData += hash.final("hex");
    return encryptedData;
  }

  compare(cryptoStr1: string, cryptoStr2: string): boolean | null {
    try {
      if(cryptoStr1 === cryptoStr2) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }
}