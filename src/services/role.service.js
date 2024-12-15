import prisma from "../common/prisma/prisma.init.js";

export const roleService = {
    create: async function (req) {
        return `This action creates a role`;
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

        const totalItems = await prisma.roles.count();

        const totalPages = Math.ceil(totalItems / pageSize);
        const results = await prisma.roles.findMany({
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
        const roleId = req.params.id;
        const roleDetail = await prisma.roles.findUnique({
            where: {
                role_id: Number(roleId),
            },
        });
        return roleDetail;
    },

    update: async function (req) {
        return `This action updates a role with id: ${req.params.id}`;
    },

    remove: async function (req) {
        return `This action removes a role with id: ${req.params.id}`;
    },
    togglePermission: async (req) => {
        const { permission_id, role_id } = req.body;
        const permissionExist = await prisma.role_permissions.findFirst({
            where: {
                permission_id: +permission_id,
                role_id: +role_id,
            },
        });

        if (permissionExist) {
            await prisma.role_permissions.update({
                where: {
                    role_permissions_id: permissionExist.role_permissions_id,
                },
                data: {
                    is_active: !permissionExist.is_active,
                },
            });
            return "ok";
        } else {
            await prisma.role_permissions.create({
                data: {
                    role_id: +role_id,
                    permission_id: +permission_id,
                },
            });
            return "ok";
        }
    },
};
