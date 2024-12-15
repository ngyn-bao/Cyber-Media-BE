import { ForbiddenError } from "../../helper/handleError.js";
import prisma from "../prisma/prisma.init.js";

const checkPermission = async (req, res, next) => {
    try {
        const baseUrl = req.baseUrl;
        const endpoint = req.route.path;
        const method = req.method;

        const fullPath = baseUrl + endpoint;
        const role_id = req.user.role_id;
        console.log({ baseUrl, endpoint, method, role_id });
        if (role_id == 1) {
            next();
            return;
        }

        const permissionNotValid = await prisma.role_permissions.findFirst({
            where: {
                permissions: {
                    endpoint: fullPath,
                    method: method,
                },
                role_id: role_id,
                is_active: false,
            },
        });
        if (permissionNotValid) {
            throw new ForbiddenError("User không có quyền truy cập");
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default checkPermission;
