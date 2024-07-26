export class CustomError {
  constructor(statusCode, msg) {
    this.statusCode = statusCode;
    this.msg = msg;
  }

  serializeErrors() {
    return [{ msg: this.msg }];
  }
}
