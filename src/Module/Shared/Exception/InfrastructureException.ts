import { BaseException } from './BaseException';
import { ExceptionCode } from './ExceptionCode';

// Should be used in Infrastructure layer
export class InfrastructureException extends BaseException {
  constructor(
    message: string,
    previousError?: Error | unknown,
    code?: ExceptionCode,
  ) {
    super(message, previousError, code);
  }
}
