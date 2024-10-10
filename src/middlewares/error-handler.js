import { CustomError } from "../lib/custom-error.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.log({ errorInErrorHandler: err });
  res.status(400).send({
    errors: [
      {
        msg: "Something went wrong",
      },
    ],
  });
};
