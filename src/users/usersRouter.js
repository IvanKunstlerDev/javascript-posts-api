import { Router } from "express";
import usersController from "./usersController.js";
import { asyncHandler } from "../shared/utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(usersController.getAllUsers));

router.get("/:id", asyncHandler(usersController.getUserDetails));

export default router;
