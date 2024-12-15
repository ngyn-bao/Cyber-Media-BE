import { handleSuccessResponse } from "../helper/handleResponse.js";
import { userService } from "../services/user.service.js";

export const userController = {
  create: async function (req, res, next) {
    try {
      const result = await userService.create(req);
      const response = handleSuccessResponse(
        `Create user successfully`,
        undefined,
        result
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await userService.findAll(req);
      const response = handleSuccessResponse(
        `Get all users successfully`,
        undefined,
        result
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await userService.findOne(req);
      const response = handleSuccessResponse(
        `Get user #${req.params.id} successfully`,
        undefined,
        result
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await userService.update(req);
      const response = handleSuccessResponse(
        `Update user #${req.params.id} successfully`,
        undefined,
        result
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await userService.remove(req);
      const response = handleSuccessResponse(
        `Remove user #${req.params.id} successfully`,
        undefined,
        result
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  uploadAvatar: async function (req, res, next) {
    try {
      const result = await userService.uploadAvatar(req);
      const response = handleSuccessResponse(
        `Upload avatar successfully`,
        undefined,
        result
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};
