import usersService from "./usersService.js";

const getAllUsers = async (req, res) => {
  const userList = await usersService.findAllUsers();

  res.json(userList);
};

const getUserDetails = async (req, res) => {
  const userId = req.params.id;

  if (!userId) throw new AppError("User id is required.", 400);

  const user = await usersService.findUserById(userId);

  if (!user) throw new AppError("User not found.", 404);

  res.json(user);
};

export default { getAllUsers, getUserDetails };
