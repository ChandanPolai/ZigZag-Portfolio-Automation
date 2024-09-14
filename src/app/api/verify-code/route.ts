import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { APIResponse } from "@/helpers/APIResponse";

import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  await dbConnect();
  try {

    const session = await getServerSession(AuthOptions);
    console.log("thatis user session",session)

    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);
    console.log("verify code ka decode username: " + decodedUsername);

    const result = z
      .object({ username: usernameValidation })
      .safeParse({ username: decodedUsername });

    if (!result.success) {
      const usernameErr = result.error.format()?.username?._errors;
      return APIResponse(400, usernameErr ? usernameErr[0] : "Invalid username format");
    }

    // find user
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) return APIResponse(400, "User not found");

    if (user.isVerified) return APIResponse(400, "Account is already verified");

    const isValidCode = user.verifyCode === code;
    const isNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isValidCode && isNotExpired) {
      user.isVerified = true;
      await user.save();
      return APIResponse(200, "Account verified successfully 🥳");
    } else if (!isNotExpired) {
      return APIResponse(400, "Verify Code has been Expired!!! Please Sign-up again...");
    } else {
      return APIResponse(400, "Invalid Verify Code");
    }
  } catch (error) {
    console.log("VERIFY_CODE_ERROR:: ", error);
    return APIResponse(500, "Error while verifying code");
  }
}
