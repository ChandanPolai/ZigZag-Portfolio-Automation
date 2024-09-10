import { APIResponse } from "@/helpers/APIResponse";
import { sendForgotPasswordEmail } from "@/helpers/sendForgotPasswordEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { identifier } = await request.json();

    const user = await UserModel.findOne({
      $or: [
        { email: identifier, isVerified: true },
        { username: identifier, isVerified: true },
      ],
    });

    console.log('user: ',user);

    if (!user) return APIResponse(404, "We can not find any user with this email");

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date(Date.now() + 10 * 60 * 1000);

    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = expiryDate;

    await user.save();

    const emailRes = await sendForgotPasswordEmail(user.email, user.username, verifyCode);

    if (!emailRes.success) return APIResponse(500, emailRes.message);

    return APIResponse(200, "OTP Sent Successfully", {
      isSuccess: true,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log("SEND OTP ERROR: ", error);
    return APIResponse(500, "Error occurred while Sending OTP");
  }
}
