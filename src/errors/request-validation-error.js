import { CustomError } from "./custom-error.js";

export class RequestValidationError extends CustomError {
  constructor(errors) {
    super(400, "Invalid request parameters");
    this.errors = errors;
  }

  serializeErrors() {
    return this.errors.map((error) => {
      // if (error.type === "field") {
      //   return {
      //     message: error.msg,
      //     field: error.path,
      //   };
      // }
      return { msg: error.msg };
    });
  }
}
