import { prisma } from "../database/prisma.js";
import AppError from "../errorHandling/AppError.js";
import config from "../config.js";

const PAGINATION_SIZE = config.postsPaginationSize;

const createPost = async (userId, body) => {
  try {
    const newPost = await prisma.post.create({
      data: { userId, body },
      omit: {
        deletedAt: true,
      },
    });

    return newPost;
  } catch (e) {
    if (e.code && e.code === "P2003") {
      throw new AppError("User not found.", 404);
    }
    throw e;
  }
};

const findAllPosts = async (page) => {
  const postList = await prisma.post.findMany({
    where: { deletedAt: null },
    omit: { deletedAt: true },
    skip: (page - 1) * PAGINATION_SIZE,
    take: PAGINATION_SIZE,
  });

  return postList;
};

const findPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id },
    omit: { deletedAt: true },
  });

  return post;
};

export default { createPost, findAllPosts, findPostById };
