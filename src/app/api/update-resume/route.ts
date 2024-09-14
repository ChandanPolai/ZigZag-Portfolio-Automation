import ResumeModel from "@/model/Resume";
import dbConnect from "@/lib/dbConnect";
import { APIResponse } from "@/helpers/APIResponse";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/options";

export async function PATCH(request: Request) {
  await dbConnect(); // Connect to the database


  try {
    // Extract session and resume update data from the request
    const session = await getServerSession(AuthOptions);
    const sessionUser = session?.user;

    if (!session || !sessionUser) {
      return APIResponse(401, "Not authenticated");
    }

    // Extract resumeId and updateData from the request body
    const { resumeId, updateData } = await request.json();

    // Find the resume by ID and ensure it belongs to the current user
    const resume = await ResumeModel.findOne({ _id: resumeId, owner: sessionUser._id });

    if (!resume) {
      return APIResponse(400, "Resume not found or not authorized");
    }

    // Update resume fields with the provided data
    Object.assign(resume, updateData);

    // Save the updated resume
    await resume.save();

    return APIResponse(200, "Resume updated successfully", resume);
  } catch (error) {
    console.error("UPDATE_RESUME_ERROR :: ", error);
    return APIResponse(500, "Error occurred while updating resume");
  }
}
