import postsService from "./postsService.js";
import AppError from "../errorHandling/AppError.js";

const getAllPosts = async (req, res) => {
  const page = Number(req.query.page ?? 1);

  if (!page || page < 1)
    throw new AppError(
      "Page query param must be a integer greater than 0.",
      400
    );

  const postList = await postsService.findAllPosts(page);

  res.json(postList);
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  const post = await postsService.findPostById(postId);

  if (!post) throw new AppError("Post not found.", 404);

  res.json(post);
};

const createPost = async (req, res) => {
  const data = req.body;

  if (!data.userId || !data.body) {
    throw new AppError("Fields userId and body are required.", 422);
  }

  const newPost = await postsService.createPost(data.userId, data.body);

  res.status(201).json(newPost);
};

export default { getAllPosts, getPostById, createPost };
