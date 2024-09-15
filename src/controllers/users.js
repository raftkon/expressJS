import jwt from "jsonwebtoken";

import { Password } from "../lib/password.js";
import { Secure } from "../lib/secure.js";
import { CustomError } from "../errors/custom-error.js";
import { createUser, getUserByEmail } from "../db/queries/users.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    throw new CustomError(400, "Invalid credentials.");
  }
  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );
  if (!passwordsMatch) {
    throw new CustomError(400, "Invalid credentials.");
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 10,
    }
  );
  // Encrypt user data
  req.session.jwt = Secure.encrypt(userJwt);

  res.send({ user: existingUser });
};

export const signUp = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new CustomError(400, "User with this email already exists.");
  }
  const user = await createUser(email, password);
  res.send({ user });
};

export const signOut = (req, res) => {
  req.session = null;
  console.log({ user: req.currentUser });
  res.send({ user: null });
};

export const getCurrentUser = (req, res) => {
  res.send({ user: req.currentUser || null });
};
