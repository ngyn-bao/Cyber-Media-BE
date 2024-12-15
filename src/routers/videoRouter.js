import express from "express";
import { pool } from "../common/mysql2/mysql.connection.js";
import videoController from "../controllers/video.controller.js";
import protect from "../common/middleware/protect.middleware.js";
import checkPermission from "../common/middleware/check-permission.middleware.js";

const videoRouter = express.Router();

// videoRouter.use(protect);
// lưu ý bỏ checkPermission sau "/video-list"
videoRouter.get("/video-list", videoController.videoList);

videoRouter.get("/video-type", videoController.videoType);

export default videoRouter;
