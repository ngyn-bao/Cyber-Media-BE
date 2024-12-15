import express from "express";
import authController from "../controllers/auth.controller.js";
import protect from "../common/middleware/protect.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);

//2p setup bộ router => service => "test server đăng nhập thành công"

authRouter.post("/login", authController.login);

authRouter.post("/facebook-login", authController.facebookLogin);

authRouter.post("/refresh-token", authController.refreshToken);

authRouter.get("/get-info", protect, authController.getInfo);

export default authRouter;
