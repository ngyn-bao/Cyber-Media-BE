import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ForbiddenError,
  UnAuthorizedError,
} from "../helper/handleError.js";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenService from "./token.service.js";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/config.constant.js";
import { getInfo } from "prisma";
import { sendMail } from "../common/mail/sendMail.nodemailer.js";

const authService = {
  register: async function (req) {
    const { email, pass_word, full_name } = req.body;
    if (!email || !pass_word || !full_name) {
      throw new BadRequestError("Dữ liệu truyền vào không hợp lệ");
    }
    //b2: so sánh dữ liệu gửi đến có trong db hay không

    // select * from user where email like email;
    const userExist = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (userExist) {
      throw new Error("Đã tồn tại user này");
      //b3: chưa tồn tại => tạo mới user đó
    } else {
      const hashedPassword = await brcypt.hash(pass_word, 10);
      const newUser = await prisma.users.create({
        data: {
          email: email,
          pass_word: hashedPassword,
          full_name: full_name,
        },
      });
      console.log(email);
      //   newUser.pass_word = "12345";
      sendMail(email, "Bạn có khỏe không");
      return newUser;
    }
  },
  login: async (req) => {
    //b1: nhận dữ liệu từ FE (body gửi lên);
    let { email, pass_word } = req.body;
    console.log(email, pass_word);

    // b2: kiểm tra email có trong hệ thống hay không? 2 TH
    const userExist = await prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        pass_word: true,
        email: true,
        user_id: true,
      },
    });
    //kĩ thuật ngắt dòng
    if (!userExist) {
      throw new BadRequestError(
        "Không tìm thấy tài khoản, vui lòng đăng kí nhé!"
      );
    }
    //bước 3 kiểm tra password;
    const isValidPassword = brcypt.compareSync(pass_word, userExist.pass_word);
    if (!isValidPassword) {
      throw new BadRequestError("Sai mật khẩu rồi bạn eei!");
    }
    //bước 4: tạo token với jwt //accessToken và refreshToken
    const tokens = tokenService(userExist);
    return tokens;
  },
  facebookLogin: async (req) => {
    //payload từ request của token Facebook được FE gửi lên
    const { name, email, id, picture } = req.body;
    console.log({ name, email, id, picture });
    const userExist = await prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        user_id: true,
        full_name: true,
        avatar: true,
      },
    });
    if (userExist) {
      await prisma.users.update({
        where: {
          user_id: userExist.user_id,
        },
        data: {
          full_name: userExist.full_name ? undefined : name,
          avatar: userExist.avatar ? undefined : picture.data.url,
          face_app_id: userExist.face_app_id ? undefined : id,
        },
      });
      const tokens = tokenService(userExist);

      return tokens;
    } else {
      //tạo mới user đó
      const userExist = await prisma.users.create({
        data: {
          email: email,
          full_name: name,
          pass_word: null,
          face_app_id: id,
          avatar: picture.data.url,
        },
      });

      const tokens = tokenService(userExist);
      return tokens;
    }
  },
  refreshToken: async (req) => {
    //xác thực lại và cấp token mới cho user
    // const request = req.headers;
    const refreshToken = req.headers?.authorization?.split(" ")[1];
    const accessToken = req.headers["x-access-token"];
    //console.log({ log_token: refreshToken, log_token2: accessToken });
    //xác minh các cái token này dùng verify của jwt

    const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    });
    const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (decodeAccessToken.user_id !== decodeRefreshToken.user_id) {
      throw new UnAuthorizedError();
    }
    const user_exist = await prisma.users.findUnique({
      where: {
        user_id: decodeRefreshToken.user_id,
      },
    });

    if (!user_exist) {
      throw new ForbiddenError();
    }
    const tokens = tokenService(user_exist);
    return tokens;
  },
  getInfo: async (req) => {
    const user = req.user;
    // console.log(user);
    return user;
  },
};

export default authService;
