import nodemailer from "nodemailer";
import { APIResponse } from "@/types/APIResponse";
import { generateVerificationEmail } from "../../emails/verificationEmail";

export async function sendEmailVerificationEmail(
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

    console.log(process.env.MAILER_USER)
    console.log(process.env.MAILER_PASS)

    const emailContent = generateVerificationEmail({
      username,
      otp: verifyCode,
    });

    const info = await transporter.sendMail({
      from: "tripurasuraa@gmail.com",
      to: email,
      subject: "Mystery feedback Verification Code",
      html: emailContent,
    });

    // ```````````````````
    console.log("emailverification ka code:00",info)

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (emailError) {
    console.log("Error sending verification email: ", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}

// import { resend } from "@/lib/resend";
// import verificationEmail from "../../emails/verificationEmail";
// import { APIResponse } from "@/types/APIResponse";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<APIResponse> {
//   try {
//     console.log("Sending email...");
//     const { data, error } = await resend.emails.send({
//       from: "Acme <onboarding@resend.dev>",
//       // from: "ypzanzarukiya@gmail.com",
//       to: email,
//       subject: "Verification Code",
//       react: verificationEmail({ username, otp: verifyCode }),
//     });
//     console.log({ data, error });
//     if (!data)
//       return { success: false, message: error?.message || "Failed to send verification email" };
//     return { success: true, message: "Verification email sent successfully" };
//   } catch (error) {
//     console.error("Error sending verification Email");
//     return { success: false, message: "Failed to send verification email" };
//   }
// }
