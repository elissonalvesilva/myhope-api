export type Result<T, E> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }
}

export class Err<T, E> {
  readonly value: E;

  constructor(value: E) {
    this.value = value;
  }

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }
}

export const ok = <T, E>(l: T): Result<T, E> => {
  return new Ok(l);
};

export const err = <T, E>(a: E): Result<T, E> => {
  return new Err<T, E>(a);
};