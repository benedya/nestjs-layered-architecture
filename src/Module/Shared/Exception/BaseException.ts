import { ExceptionCode } from './ExceptionCode';

export abstract class BaseException extends Error {
  readonly previousError?: Error | unknown;
  readonly code?: ExceptionCode;

  protected constructor(
    message: string,
    previousError?: Error | unknown,
    code?: ExceptionCode,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.previousError = previousError;
    this.code = code;
  }
}
