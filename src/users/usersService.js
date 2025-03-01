import { prisma } from "../database/prisma.js";

const findAllUsers = async () => {
  const userList = await prisma.user.findMany({
    omit: {
      password: true,
      email: true,
    },
  });

  const usersWithPicture = userList.map((u) => ({
    ...u,
    picture: `https://robohash.org/${u.username}`,
  }));

  return usersWithPicture;
};

const findUserById = async (id) => {
  const findedUser = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      lastUpdate: true,
      posts: {
        where: { deletedAt: null },
        omit: { deletedAt: true },
      },
    },
  });

  const userWithPicture = {
    ...findedUser,
    picture: `https://robohash.org/${findedUser.username}`,
  };

  return userWithPicture;
};

export default { findAllUsers, findUserById };
