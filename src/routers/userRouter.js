import express from "express";
import { userController } from "../controllers/user.controller.js";
import upload from "../common/multer/handle-upload-local.multer.js";
import fs from "fs";
import { uploadCloud } from "../common/multer/handel-upload-cloud.multer.js";
import protect from "../common/middleware/protect.middleware.js";

const userRouter = express.Router();

fs.mkdirSync("images", { recursive: true });

// Tạo route CRUD
userRouter.post("/", userController.create);
userRouter.get("/", userController.findAll);
userRouter.get("/:id", userController.findOne);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.remove);
userRouter.post(
  "/avatar-local",
  protect,
  upload.single("avatar"),
  userController.uploadAvatar
);
userRouter.post(
  "/avatar-cloud",
  protect,
  uploadCloud.single("avatar"),
  userController.uploadAvatar
);

export default userRouter;
