import LocalizableError from './LocalizableError';

// We are only supposed to throw LocalizableError
// We use this as a fallback in case of programmer error
class UnknowError extends LocalizableError {
  constructor() {
    super({
      id: 'error.unknowError',
      defaultMessage: '!!!Unknow error.',
    });
  }
}

export class UnexpectedError extends LocalizableError {
  constructor() {
    super({
      id: 'error.unexpectedError',
      defaultMessage: '!!!Something unexpected happened. Please retry.',
    });
  }
}

export function localizedError(error: Error): LocalizableError {
  if (error instanceof LocalizableError) {
    return error;
  }
  return new UnknowError();
}
