import { APIResponse } from "@/helpers/APIResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username } = await request.json();

    const session = await getServerSession(AuthOptions);
    const sessionUser = session?.user;

    if (!session || !sessionUser) return APIResponse(400, "Not authenticated");

    const isExistingUser = await UserModel.findOne({ username });
    if (isExistingUser && isExistingUser.isVerified) {
      return APIResponse(400, "Username is already taken");
    }

    const user = await UserModel.findByIdAndUpdate(sessionUser._id, { username }, { new: true });
    console.log("Updated User: ", user);

    return APIResponse(200, "Username updated successfully", user);
  } catch (error) {}
}
