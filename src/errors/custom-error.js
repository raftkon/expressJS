/**
 * CustomError class is the general error class for other specific errors to extend.
 * It accepts two arguments `statusCode` and `msg`. It contains `serializeErrors()` method
 * in order to provide all error messages in the same fashion for better error handling.
 */
export class CustomError {
  constructor(statusCode, msg) {
    this.statusCode = statusCode;
    this.msg = msg;
  }

  serializeErrors() {
    return [{ msg: this.msg }];
  }
}
