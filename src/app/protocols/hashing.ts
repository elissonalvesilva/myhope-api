export default interface Hashing {
  hash(parameter?: string): string;
  compare(value1: string, value2: string): boolean;

}