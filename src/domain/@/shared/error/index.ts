export class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  cause?: any;
  code?: number;

  constructor({ name, message, cause, code }: { name: T, message: string, cause?: any, code?: number }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
    this.code = code;
  }
}