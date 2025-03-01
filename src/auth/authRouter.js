import { Router } from "express";
import authController from "./authController.js";
import { asyncHandler } from "../shared/utils/asyncHandler.js";

const router = Router();

router.post("/login", asyncHandler(authController.login));

router.post("/register", asyncHandler(authController.register));

router.post("/logout", asyncHandler(authController.logout));

router.patch("/change-password", asyncHandler(authController.changePassword));

export default router;
