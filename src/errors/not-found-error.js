import { CustomError } from "./custom-error.js";

export class NotFoundError extends CustomError {
  constructor() {
    super(404, "Not Found");
  }

  serializeErrors() {
    return [{ msg: this.msg }];
  }
}
