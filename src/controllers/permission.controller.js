import { handleSuccessResponse } from "../helper/handleResponse.js";
import { permissionService } from "../services/permission.service.js";

export const permissionController = {
    create: async function (req, res, next) {
        try {
            const result = await permissionService.create(req);
            const response = handleSuccessResponse(
                "Tạo mới permission thành công",
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
            const result = await permissionService.findAll(req);
            const response = handleSuccessResponse(
                "lấy permission thành công",
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
            const result = await permissionService.findOne(req);
            const response = handleSuccessResponse(
                "lấy permission thành công",
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
            const result = await permissionService.update(req);
            const response = handleSuccessResponse(
                "lấy permission thành công",
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
            const result = await permissionService.remove(req);
            const response = handleSuccessResponse(
                "lấy permission thành công",
                undefined,
                result
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
    groupByModule: async function (req, res, next) {
        try {
            const result = await permissionService.groupByModule(req);
            const response = handleSuccessResponse(
                "Group By Module thành công",
                undefined,
                result
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
};
