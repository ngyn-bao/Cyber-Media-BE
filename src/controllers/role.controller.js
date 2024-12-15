import { handleSuccessResponse } from "../helper/handleResponse.js";
import { roleService } from "../services/role.service.js";

export const roleController = {
    create: async function (req, res, next) {
        try {
            const result = await roleService.create(req);
            const response = handleSuccessResponse(
                `Create role successfully`,
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
            const result = await roleService.findAll(req);
            const response = handleSuccessResponse(
                `Get all role successfully`,
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
            const result = await roleService.findOne(req);
            const response = handleSuccessResponse(
                `Get role #${req.params.id} successfully`,
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
            const result = await roleService.update(req);
            const response = handleSuccessResponse(
                `Update role #${req.params.id} successfully`,
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
            const result = await roleService.remove(req);
            const response = handleSuccessResponse(
                `Remove role #${req.params.id} successfully`,
                undefined,
                result
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
    togglePermission: async function (req, res, next) {
        try {
            const result = await roleService.togglePermission(req);
            const response = handleSuccessResponse(
                `Toggle thành công`,
                undefined,
                result
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
};
