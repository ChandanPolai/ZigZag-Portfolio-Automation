import ResumeModel from "@/model/Resume";
import { APIResponse } from "@/helpers/APIResponse";
import dbConnect from "@/lib/dbConnect";

// Dummy data for resume
const dummyResumeData = {
  name: "John Doe",
  image: "https://example.com/image.jpg",
  contact: {
    phone: "1234567890",
    email: "johndoe@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
  summary: {
    summary: "I am a software developer with 5 years of experience.",
  },
  education: [
    {
      institution: "ABC University",
      degree: "B.Tech in Computer Science",
      location: "New York",
      duration: "2015-2019",
    },
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "Tech Solutions",
      location: "New York",
      duration: "2020-Present",
      responsibilities: ["Develop web applications", "Collaborate with team"],
    },
  ],
  projects: [
    {
      title: "Project Management System",
      technologies: "React, Node.js, MongoDB",
      duration: "6 months",
      description: [
        "Designed and developed a project management system.",
        "Implemented real-time task tracking.",
      ],
    },
  ],
  skills: {
    languages: "JavaScript, TypeScript",
    frameworks: "React, Next.js",
    developerTools: "VS Code, Git",
    libraries: "Redux, Axios",
  },
  owner: "66d6f776d312cdc6afe09c5a", // Example ObjectID, handle dynamically
  templateId: "template1",
  permanentdata: true,
};

// API route to insert resume dummy data
export async function POST(request: Request) {
  await dbConnect(); // Connect to the database

  try {
  
    // Insert the dummy resume data into the database
    const newResume = await ResumeModel.create(dummyResumeData);

    // Return success response with the newly created resume data
    return APIResponse(200, "Resume created successfully", newResume);
  } catch (error) {
    console.error("ADD_RESUME_ERROR :: ", error);

    // Return error response in case of failure
    return APIResponse(500, "Error occurred while adding resume");
  }
}
