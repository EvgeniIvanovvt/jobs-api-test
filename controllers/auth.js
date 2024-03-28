const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ user: user.getUserData(), token: user.generateToken() });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  // compare password
  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  res
    .status(StatusCodes.OK)
    .json({ user: user.getUserData(), token: user.generateToken() });
};

module.exports = { register, login };
