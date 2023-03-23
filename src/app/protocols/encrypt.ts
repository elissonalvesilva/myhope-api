export default interface Encrypt {
  encrypt(str: string): string;
  decrypt(val1: string, val2: string): boolean
}