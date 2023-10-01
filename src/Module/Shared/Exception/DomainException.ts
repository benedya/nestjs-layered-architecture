import { BaseException } from './BaseException';
import { ExceptionCode } from './ExceptionCode';

// Should be used in Domain layer
export class DomainException extends BaseException {
  constructor(
    message: string,
    previousError?: Error | unknown,
    code?: ExceptionCode,
  ) {
    super(message, previousError, code);
  }
}
