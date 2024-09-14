import { z } from 'zod';

// Project Schema
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  technologies: z.string().min(1, "Technologies are required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.array(z.string()).min(1, "At least one description is required"),
});

// Skills Schema
const skillSchema = z.object({
  languages: z.string().min(1, "Languages are required"),
  frameworks: z.string().min(1, "Frameworks are required"),
  developerTools: z.string().min(1, "Developer tools are required"),
  libraries: z.string().min(1, "Libraries are required"),
});

// Education Schema
const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
});

// Experience Schema
const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
});

// Profile Summary Schema
const profileSummarySchema = z.object({
  summary: z.string().min(10, "Summary must be at least 10 characters long"),
});

// Resume Schema
const resumeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  summary: profileSummarySchema.optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  projects: z.array(projectSchema).optional(),
  skills: skillSchema.optional(),
  owner: z.string().uuid("Invalid owner ID"),
  templateId: z.string().min(1, "Template ID is required"),
  permanentdata: z.boolean().optional(),
});

export type ResumeType = z.infer<typeof resumeSchema>;
