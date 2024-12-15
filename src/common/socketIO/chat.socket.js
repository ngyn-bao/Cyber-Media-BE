import prisma from "../prisma/prisma.init.js";

const chatSocket = (io, socket) => {
  socket.on("join-room", (payload) => {
    const { user_id_sender, user_id_recipient } = payload;
    // console.log(user_id_sender, user_id_recipient);

    const roomId = [user_id_sender, user_id_recipient].sort().join("_");
    // console.log(roomId);
    socket.rooms.forEach((roomId) => {
      socket.leave(roomId);
    });

    socket.join(roomId);
  });
  socket.on("send-message", async (payload) => {
    console.log(payload);
    const { user_id_sender, user_id_recipient, message } = payload;
    const roomId = [user_id_sender, user_id_recipient].sort().join("_");

    io.to(roomId).emit("receive-message", payload);

    await prisma.chats.create({
      data: {
        message: message,
        user_id_sender: user_id_sender,
        user_id_recipient: user_id_recipient,
      },
    });
  });

  socket.on("get-list-message", async (payload) => {
    const { user_id_sender, user_id_recipient } = payload;
    const roomId = [user_id_sender, user_id_recipient].sort().join("_");

    const chats = await prisma.chats.findMany({
      where: {
        user_id_sender: { in: [user_id_sender, user_id_recipient] },
        user_id_recipient: { in: [user_id_sender, user_id_recipient] },
      },
    });
    io.to(roomId).emit("get-list-message", chats);
  });
};

export default chatSocket;
