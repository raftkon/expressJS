import { CustomError } from "./custom-error.js";

export class DatabaseConnectionError extends CustomError {
  constructor() {
    super(500, "Error connecting to database");
  }
  serializeErrors() {
    return [{ msg: this.msg }];
  }
}
