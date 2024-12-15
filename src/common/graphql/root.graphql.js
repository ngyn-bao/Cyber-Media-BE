import prisma from "../prisma/prisma.init.js";

// The root provides a resolver function for each API endpoint
const root = {
  hello() {
    return "Hello world!";
  },
  hello2() {
    return "Hello world!";
  },
  async getVideoType() {
    const videoTypes = await prisma.video_type.findMany();
    console.log(videoTypes);
    return videoTypes;
  },
  async createVideoType(payload) {
    let { type_name, icon } = payload;
    const newVideoType = await prisma.video_type.create({
      data: {
        type_name: type_name,
        icon: icon,
      },
    });
    return newVideoType;
  },
  async updateVideoType(payload) {
    let { type_id, type_name, icon } = payload;
    const updatedVideoType = await prisma.video_type.update({
      where: {
        type_id: type_id,
      },
      data: {
        type_name,
        icon,
      },
    });
    return updatedVideoType;
  },
  async deleteVideoType(payload) {
    let typeId = payload.type_id;
    await prisma.video_type.delete({
      where: {
        type_id: typeId,
      },
    });
    return `Đã xóa item ${typeId}`;
  },
};
export default root;
