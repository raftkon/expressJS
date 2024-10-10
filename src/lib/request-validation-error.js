import { CustomError } from "./custom-error.js";

/**
 * RequestValidationError class is used to prettify any errors regarding the express-validator package in `validate-request.js` middleware.
 */
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
