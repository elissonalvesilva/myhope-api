export class ServerError extends Error {
  constructor(stack?: string) {
    super('Internal Server error');
    this.name = 'ServerError';
    this.stack = stack;
  }
}

export class BadRequestError extends Error {
  constructor(message?: any) {
    super(JSON.stringify(message));
    this.name = 'BadRequestError';
  }
}

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param ${paramName}`);
    this.name = 'MissingParamError';
  }
}

export class NotFoundError extends Error {
  constructor(paramName: string) {
    super(`Not found ${paramName}`);
    this.name = 'NotFoundError';
  }
}