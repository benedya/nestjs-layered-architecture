import { BaseException } from './BaseException';
import { ExceptionCode } from './ExceptionCode';

// Should be used in Application layer
export class ApplicationException extends BaseException {
  constructor(
    message: string,
    previousError?: Error | unknown,
    code?: ExceptionCode,
  ) {
    super(message, previousError, code);
  }
}
