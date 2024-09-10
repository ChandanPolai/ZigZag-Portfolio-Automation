import nodemailer from "nodemailer";
import { APIResponse } from "@/types/APIResponse";
import { generateForgotPasswordEmail } from "../../emails/forgotPasswordEmail";

export async function sendForgotPasswordEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<APIResponse> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const emailContent = generateForgotPasswordEmail({
      username,
      otp: verifyCode,
    });

    const info = await transporter.sendMail({
      from: "tripurasuraa@gmail.com",
      to: email,
      subject: "Forgot Password OTP",
      html: emailContent,
    });

        // ```````````````````
        console.log("forgot passwordka ka code:00",info)

    return {
      success: true,
      message: "Forgot Password email sent successfully",
    };
  } catch (emailError) {
    console.log("Error sending email: ", emailError);
    return {
      success: false,
      message: "Failed to send email",
    };
  }
}
