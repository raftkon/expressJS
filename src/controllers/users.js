import { Password } from "../lib/password.js";
import { Secure } from "../lib/secure.js";
import jwt from "jsonwebtoken";
import { User } from "../models/users.js";
import { CustomError } from "../errors/custom-error.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
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

  req.session.jwt = Secure.encrypt(userJwt);

  // Store it on session object
  // req.session.jwt = userJwt;
  res.send({ existingUser });
};

export const signUp = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError(400, "User with this email already exists.");
  }
  const user = new User({
    email,
    password,
  });
  await user.save();

  // // Generate JWT
  // const userJwt = jwt.sign(
  //   {
  //     id: user.id,
  //     email: user.email,
  //   },
  //   process.env.TOKEN_SECRET
  // );
  // Store it on session object
  // req.session.jwt = Secure.encrypt(userJwt);

  res.send({ user });
};

export const signOut = (req, res) => {
  req.session = null;
  res.send({});
};

export const getCurrentUser = (req, res) => {
  // res.send({user: req?.currentUser})
  res.send({ user: req.currentUser || null });
};
