import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    jest,
    test,
} from "@jest/globals";
import authService from "../../services/auth.service.js";
import prisma from "../prisma/prisma.init.js";

describe("Authen", () => {
    beforeEach(() => {
        console.log("Hàm này chạy trước khi kiểm thử");
        jest.spyOn(prisma.users, "create");
    });
    afterEach(() => {
        console.log("Hàm này chạy sau khi kiểm thử");
    });
    it("Case 1: Đăng kí thành công", async () => {
        await prisma.users.create.mockResolvedValue({
            user_id: 4,
            email: "test@gmail.com",
            full_name: "Nguyễn Văn A",
            avatar: null,
            google_id: null,
            face_app_id: null,
            created_at: "2024-11-17T13:08:21.000Z",
            updated_at: "2024-11-17T13:08:21.000Z",
            role_id: 2,
        });

        const newUser = await authService.register({
            body: {
                email: "test@gmail.com",
                pass_word: "12345",
                full_name: "Nguyễn Văn A",
            },
        });

        // expect(typeof newUser.email).toBe("String");
        // console.log(newUser);
        //validation cái Email bằng email
        expect(newUser.pass_word).not.toHaveProperty("pass_word");
        console.log("Test case 1 passed");
    });
    it("Case 2: Đăng kí thất bại", () => {
        console.log("Test case 2 not passed");
    });
});
