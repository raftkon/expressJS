import jwt from "jsonwebtoken";

import { Secure } from "../lib/secure.js";
import { NotAuthorizedError } from "../errors/not-authorized-error.js";
import { CustomError } from "../errors/custom-error.js";

// currentUser() & requireAuth() combined
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

// const requireAuth = (req, res, next) => {
//   if (!req.currentUser) {
//     throw new NotAuthorizedError();
//   }
//   next();
// };

// const currentUser = (req, res, next) => {
//   const { jwt: jwtToken } = req.session;

//   if (!jwtToken) {
//     return next();
//   }
//   try {
//     const data = Secure.decrypt(jwtToken);
//     const payload = jwt.verify(data, process.env.TOKEN_SECRET);
//     req.currentUser = payload;
//   } catch (error) {
//     throw new CustomError(400, error?.message);
//   }
//   next();
// };
