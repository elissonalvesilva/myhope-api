import crypto from 'crypto';

import Cryptography from "@/app/protocols/cryptography";

export default class Cryto implements Cryptography {
  protected algoritm = "aes-256-cbc";
  
  constructor(
    private readonly secretKey: string,
    private readonly initVector: string,
  ){}

  encrypt(str: string): string {
    let hash = crypto.createCipheriv(this.algoritm, this.secretKey, this.initVector);
    let encryptedData = hash.update(str, "utf-8", "hex");

    encryptedData += hash.final("hex");
    return encryptedData;
  }

  compare(cryptoStr1: string, cryptoStr2: string): boolean | null {
    try {
      const decipher = crypto.createDecipheriv(this.algoritm, this.secretKey, this.initVector);

      let decryptedData1 = decipher.update(cryptoStr1, "hex", "utf-8");
      decryptedData1 += decipher.final("utf8"); 

      let decryptedData2 = decipher.update(cryptoStr2, "hex", "utf-8");
      decryptedData2 += decipher.final("utf8");

      if(decryptedData1 === decryptedData2) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }
}