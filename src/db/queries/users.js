import { User } from "../models/users.js";

// export const createUser = async (data) => await User.create(data);

export const createUser = async (email, password) => {
  const newUser = new User({
    email,
    password,
  });
  await newUser.save();
  return newUser;
};

export const getUserByEmail = async (email) =>
  await User.findOne({ email }).exec();

export const getUserById = async (id) => await User.findById(id).exec();
