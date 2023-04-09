export default interface Cryptography {
  encrypt(str: string): string;
  compare(cryptoStr1: string, cryptoStr2: string): boolean | null;
}