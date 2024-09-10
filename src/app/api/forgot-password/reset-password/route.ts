import { APIResponse } from "@/helpers/APIResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, password } = await request.json();

    const user = await UserModel.findOne({ username });

    if (!user) return APIResponse(404, "We can not find any user with this username");

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    return APIResponse(200, "Password Changed Successfully");
  } catch (error) {
    console.log("RESET PASSWORD ERROR: ", error);
    return APIResponse(500, "Error occurred while Resetting Password");
  }
}
