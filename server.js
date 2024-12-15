import express from "express";
import cors from "cors";
import rootRouter from "./src/routers/rootRouter.js";
import { errorHandler } from "./src/helper/handleError.js";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import schema from "./src/common/graphql/schema.graphql.js";
import root from "./src/common/graphql/root.graphql.js";
import { createServer } from "node:http";
import initSocket from "./src/common/socketIO/init.socket.js";

const app = express();
const server = createServer(app);

app.use(express.json());
const PORT = 3069;

app.use(express.static("."));
// để trỏ đến và lấy ảnh từ local

console.log(123);
app.use(
  cors({
    origin: ["http://localhost:5173", "https://domain.com", "google.com"],
  })
);

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.use(rootRouter);

app.use(errorHandler);

//sử dụng prisma orm => db first
// b1: npx prisma init -> tạo 1 folder prisma - schema

//b2: npx prisma db pull => kéo các table từ tableplus về schema.prisma => model

//b3: npx prisma generate => minh họa bằng các cái object => class từ model giúp mình có thể gọi và sử dụng

//tách model sequelize done
// xử lí throw bắt lỗi =>...
//middle ware của expess js
// prisma => mapping db first
//phân trang = pagination
//authentication => register, login, logout

initSocket(server);

server.listen(PORT, () => {
  console.log("Dự án đang chạy trên port 3069");
});
