import { CustomError } from "./custom-error.js";

export class NotAuthorizedError extends CustomError {
  constructor() {
    super(401, "Not Authorized");
  }

  serializeErrors() {
    return [{ msg: this.msg }];
  }
}
