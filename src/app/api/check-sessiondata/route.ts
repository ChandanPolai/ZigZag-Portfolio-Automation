import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/options";
import { APIResponse } from "@/helpers/APIResponse";


export async function POST(request: Request) {
  // Retrieve the JWT token from the request

  
  // Log the token to the console
  
  // Get the session for the current user
  const session = await getServerSession(AuthOptions);
  console.log("User session:", session);
  
  // Return a response with the session data
  return APIResponse(200, "Session data fetched successfully", session);
}
