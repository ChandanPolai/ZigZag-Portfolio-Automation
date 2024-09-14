// import ResumeModel from "@/model/Resume";
// import UserModel from "@/model/User";
// import dbConnect from "@/lib/dbConnect";
// import { APIResponse } from "@/helpers/APIResponse";
// import { APIError } from "@/helpers/APIError";
// import { getServerSession } from "next-auth";
// import { AuthOptions } from "../auth/[...nextauth]/options";
// import { getToken } from "next-auth/jwt";

// export async function POST(request: Request) {
//   await dbConnect();

//   try {
//     const session = await getServerSession(AuthOptions);
//     console.log("thatis user session", session);
//     // const userId = session?.user?.id;
//     // console.log("that is userid",userId)
//     // if (!userId) {
//     //   return APIResponse(401, "Unauthorized to edit resume");
//     // }

//     const updateData = await request.json();
//     // console.log(updateData);

//     // Check if there's any existing resume with permanentdata set to true
//     // if (updateData?.permanentdata) {
//     //   const existingResume = await ResumeModel.findOne({
//     //     owner: userId,
//     //     permanentdata: true,
//     //   });

//     //   if (existingResume) {
//     //     // Update the permanentdata field to false for the existing resume
//     //     existingResume.permanentdata = false;
//     //     await existingResume.save();
//     //   }
//     // }

//     // Get the stored image URL from the user's document
//     // const user = await UserModel.findById(userId);
//     // const storedImageUrl = user.tempResumeImage;

//     // Create a new resume document
//     // const newResume = new ResumeModel({
//     //   owner: userId,
//     //   ...updateData,
//     //   // image: storedImageUrl, // Add the stored image URL to the resume
//     // });
//     // await newResume.save();

//     // // Clear the temporary image URL from the user's document
//     // await UserModel.findByIdAndUpdate(userId, { $unset: { tempResumeImage: "" } });

//     return APIResponse(201, "New resume template created successfully");
//   } catch (error) {
//     console.error("Error creating resume template:", error);
//     return APIResponse(500, "Error creating resume template: " + error);
//   }
// }




import ResumeModel from "@/model/Resume";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { APIResponse } from "@/helpers/APIResponse";
import { APIError } from "@/helpers/APIError";
import { getToken } from "next-auth/jwt";
import { AuthOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Retrieve JWT token
    const token = await getToken({ req: request });
    console.log("JWT Token:", token);

    // Log token and session for debugging
    const session = token ? { user: { id: token._id, username: token.username } } : null;
    console.log("Session Data from Token:", session);

    // Example of how you might extract userId from token
    const userId = token?._id;
    console.log("User ID:", userId);

    if (!userId) {
      return APIResponse(401, "Unauthorized to edit resume");
    }

    const updateData = await request.json();
    // Process the resume update as needed...

    return APIResponse(201, "New resume template created successfully");
  } catch (error) {
    console.error("Error creating resume template:", error);
    return APIResponse(500, "Error creating resume template: " + error);
  }
}

