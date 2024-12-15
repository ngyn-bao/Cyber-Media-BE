//tạo 1 connection tới DB CYBER MEDIA
import mysql2 from "mysql2";

export const pool = mysql2
    .createPool({
        host: "127.0.0.1",
        user: "root",
        port: 3307,
        password: "1234",
        database: "db_cyber_media",
        timezone: "Z",
    })
    .promise(); //đợi kết quả
