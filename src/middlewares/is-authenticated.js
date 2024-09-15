import jwt from "jsonwebtoken";

import { Secure } from "../lib/secure.js";
import { NotAuthorizedError } from "../errors/not-authorized-error.js";
import { CustomError } from "../errors/custom-error.js";

/**
 * It is used to protect routes.
 * Checks if the user is signed in, if yes it provides user data in req.currentUser
 * for other middlewares and controllers to use. If user is not signed in it throws
 * an unauthorized error.
 */
export const isAuthenticated = (req, res, next) => {
  const { jwt: jwtToken } = req.session;
  if (!jwtToken) {
    throw new NotAuthorizedError();
  }
  try {
    const data = Secure.decrypt(jwtToken);
    const payload = jwt.verify(data, process.env.TOKEN_SECRET);
    req.currentUser = payload;
  } catch (error) {
    throw new CustomError(400, error?.message);
  }
  next();
};
