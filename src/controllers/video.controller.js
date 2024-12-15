import {
    handleErrorResponse,
    handleSuccessResponse,
} from "../helper/handleResponse.js";
import typeVideoModel from "../models/videoType.model.js";
import videoService from "../services/video.service.js";

//2 loại lỗi
//1. kiểm soát được:
//2. Không kiểm soát được:

const videoController = {
    videoList: async (req, res, next) => {
        try {
            const result = await videoService.videoList(req);
            // const resData = {
            //     message: "Trả về dữ liệu video thành công",
            //     code: 200,
            //     content: result,
            // };
            const resData = handleSuccessResponse(undefined, undefined, result);
            res.status(resData.code).json(resData);
        } catch (error) {
            // console.log(error);
            // const resError = handleErrorResponse(
            //     error.message,
            //     error.code,
            //     error.stack
            // );
            // res.json(resError);
            next(error);
        }
    },
    videoType: async (req, res, next) => {
        try {
            const result = await videoService.videoType(req);
            const resData = handleSuccessResponse(
                "Lấy video type thành công",
                200,
                result
            );
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error);
        }
    },
};

export default videoController;

// const objectVD = {
//     key: value;
//     ten: "NG VAN A",
//     tinhLuong: (first) => { second }
// }
