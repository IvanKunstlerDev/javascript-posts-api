import { Router } from "express";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import postsController from "./postsController.js";

const router = Router();

router.get("/", asyncHandler(postsController.getAllPosts));

router.get("/:id", asyncHandler(postsController.getPostById));

router.post("/", asyncHandler(postsController.createPost));

export default router;
