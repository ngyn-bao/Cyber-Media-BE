import { pool } from "../common/mysql2/mysql.connection.js";
import prisma from "../common/prisma/prisma.init.js";
import { BadRequestError } from "../helper/handleError.js";
import typeVideoModel from "../models/videoType.model.js";

const videoService = {
    videoList: async (req, res, next) => {
        //pagination
        let { page, pageSize } = req.query; // param, body, header
        console.log(page, pageSize);

        // pageSize = Number(pageSize);
        // pageIndex = Number(pageIndex);

        pageSize = +pageSize > 0 ? +pageSize : 3;
        page = +page > 0 ? +page : 1;

        const skip = (page - 1) * pageSize;
        console.log(req.query, skip);

        const totalItems = await prisma.videos.count();

        const totalPages = Math.ceil(totalItems / pageSize);
        const results = await prisma.videos.findMany({
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
    videoType: async (req, res, next) => {
        let { page, pageSize } = req.query;
        // console.log({ pageSize, pageIndex });
        // { pageSize, pageIndex }
        // pageSize

        pageSize = +pageSize > 0 ? +pageSize : 3;
        page = +page > 0 ? +page : 1;

        const skip = (page - 1) * pageSize;
        //tính index bắt đầu lấy trong db cho skip

        const totalItems = await prisma.video_type.count();

        const totalPages = Math.ceil(totalItems / pageSize);
        const results = await prisma.video_type.findMany({
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

        // const result = await typeVideoModel.findAll();
        // const result = await prisma.video_type.findMany();
        // return result;
    },
};

export default videoService;
