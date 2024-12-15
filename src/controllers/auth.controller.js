import { handleSuccessResponse } from "../helper/handleResponse.js";
import authService from "../services/auth.service.js";

const authController = {
  register: async (req, res, next) => {
    try {
      const result = await authService.register(req);

      const resData = handleSuccessResponse(undefined, undefined, result);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await authService.login(req);

      const resData = handleSuccessResponse(
        "Đăng nhập thành công",
        undefined,
        result
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  facebookLogin: async (req, res, next) => {
    try {
      const result = await authService.facebookLogin(req);

      const resData = handleSuccessResponse(
        "Đăng nhập với Facebook thành công",
        undefined,
        result
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const result = await authService.refreshToken(req);

      const resData = handleSuccessResponse(
        "Refresh token thành công",
        200,
        result
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getInfo: async (req, res, next) => {
    try {
      const result = await authService.getInfo(req);

      const resData = handleSuccessResponse("Get info thành công", 200, result);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
