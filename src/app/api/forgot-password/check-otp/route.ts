import { APIResponse } from "@/helpers/APIResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { verifySchema } from "@/schemas/verifySchema";
import { z } from "zod";

const usernameSchema = z.object({
  username: usernameValidation,
});

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);

    const result = usernameSchema.safeParse({ username: decodedUsername });

    if (!result.success) {
      const usernameErr = result.error.format()?.username?._errors;
      return APIResponse(400, usernameErr ? usernameErr[0] : "Invalid Username Format");
    }

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) return APIResponse(404, "We can not find any user with this username");

    let isValidVerifyCode = user.verifyCode === code;
    let isNotExpired = user.verifyCodeExpiry > new Date();

    if (isValidVerifyCode && isNotExpired) {
      return APIResponse(200, "OTP is valid...", { isValid: true });
    } else if (!isNotExpired) {
      return APIResponse(400, "OTP is Expired Please try again", { isValid: false });
    } else {
      return APIResponse(400, "Invalid OTP", { isValid: false });
    }
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR: ", error);
    return APIResponse(500, "Error occurred while Checking OTP");
  }
}
