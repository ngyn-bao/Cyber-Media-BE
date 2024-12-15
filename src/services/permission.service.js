import prisma from "../common/prisma/prisma.init.js";
import _ from "lodash";

export const permissionService = {
    create: async function (req) {
        const { name, method, endpoint, module } = req.body;
        const permission = await prisma.permissions.create({
            data: {
                name: name,
                method: method,
                endpoint: endpoint,
                module: module,
            },
        });
        return permission;
    },

    findAll: async function (req) {
        //pagination
        let { page, pageSize } = req.query; // param, body, header
        console.log(page, pageSize);

        // pageSize = Number(pageSize);
        // pageIndex = Number(pageIndex);

        pageSize = +pageSize > 0 ? +pageSize : 3;
        page = +page > 0 ? +page : 1;

        const skip = (page - 1) * pageSize;
        console.log(req.query, skip);

        const totalItems = await prisma.permissions.count();

        const totalPages = Math.ceil(totalItems / pageSize);
        const results = await prisma.permissions.findMany({
            take: pageSize,
            skip: skip,
            orderBy: {
                created_at: "desc",
            },
        });

        return {
            page,
            pageSize,
            totalPages: totalPages,
            totalItems: totalItems,
            items: results || [],
        };
    },

    findOne: async function (req) {
        return `This action returns a permission with id: ${req.params.id}`;
    },

    update: async function (req) {
        return `This action updates a permission with id: ${req.params.id}`;
    },

    remove: async function (req) {
        return `This action removes a permission with id: ${req.params.id}`;
    },
    groupByModule: async (req) => {
        const permissionID = req.params.id;
        const permissions = await prisma.permissions.findMany({
            include: {
                role_permissions: {
                    where: {
                        permission_id: +permissionID,
                    },
                },
            },
        });
        return _.groupBy(permissions, "module");
    },
};
