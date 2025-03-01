import { prisma } from "../database/prisma.js";
import AppError from "../errorHandling/AppError.js";

const login = async (username, password) => {
  const validatedUser = await checkPassword(username, password);

  if (validatedUser.online) {
    throw new AppError("User already logged in.", 409);
  }

  await prisma.user.update({
    where: { id: validatedUser.id },
    data: { online: true },
  });

  const { online, ...user } = validatedUser;

  return user;
};

const register = async (username, password, email) => {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
    select: { username: true, email: true },
  });

  if (existingUser?.username === username) {
    throw new AppError("Username already in use.", 409);
  }

  if (existingUser?.email === email) {
    throw new AppError("Email already in use.", 409);
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      email,
    },
  });

  return {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    createdAt: newUser.createdAt,
    lastUpdate: newUser.lastUpdate,
  };
};

const logout = async (username, password) => {
  const validatedUser = await checkPassword(username, password);

  if (!validatedUser.online) {
    throw new AppError("User not logged in.", 409);
  }

  await prisma.user.update({
    where: { id: validatedUser.id },
    data: { online: false },
  });
};

const changePassword = async (username, oldPassword, newPassword) => {
  const validatedUser = await checkPassword(username, oldPassword);

  await prisma.user.update({
    where: { id: validatedUser.id },
    data: { password: newPassword, lastUpdate: new Date() },
  });
};

// Funciones auxiliares ---------------------------------------------------------------------------------------
const checkPassword = async (username, _password) => {
  const existingUser = await prisma.user.findFirst({ where: { username } });

  if (!existingUser || existingUser.password !== _password) {
    throw new AppError("Invalid credentials.", 401);
  }

  const { password, ...user } = existingUser;

  return user;
};

export default {
  login,
  register,
  logout,
  changePassword,
};
