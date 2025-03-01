import AppError from "../errorHandling/AppError.js";
import authService from "./authService.js";

const login = async (req, res) => {
  const credentials = req.body;

  if (!credentials.password || !credentials.username) {
    throw new AppError("Fields username and password are required.", 422);
  }

  const session = await authService.login(
    credentials.username,
    credentials.password
  );

  res.json(session);
};

const register = async (req, res) => {
  const data = req.body;

  if (!data.password || !data.username || !data.email) {
    throw new AppError(
      "Fields username, email and password are required.",
      422
    );
  }

  if (data.password.length < 4) {
    throw new AppError("Password must be at least 4 characters.", 422);
  }

  const session = await authService.register(
    data.username,
    data.password,
    data.email
  );

  res.status(201).json(session);
};

const logout = async (req, res) => {
  const data = req.body;

  if (!data.username || !data.password) {
    throw new AppError("Fields username and password are required.", 422);
  }

  await authService.logout(data.username, data.password);

  res.status(204).send();
};

const changePassword = async (req, res) => {
  const data = req.body;

  if (!data.username)
    throw new AppError(
      "Field username, oldPassword and newPassword are required.",
      422
    );

  await authService.changePassword(
    data.username,
    data.oldPassword,
    data.newPassword
  );

  res.status(204).send();
};

export default {
  login,
  register,
  logout,
  changePassword,
};
