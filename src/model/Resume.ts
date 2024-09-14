import mongoose, { Schema, Document } from 'mongoose';

// Defining the Project interface
export interface IProject extends Document {
  title: string;
  technologies: string;
  duration: string;
  description: string[];
}

// Defining the Skills interface
export interface ISkill extends Document {
  languages: string;
  frameworks: string;
  developerTools: string;
  libraries: string;
}

// Defining the Education interface
export interface IEducation extends Document {
  institution: string;
  degree: string;
  location: string;
  duration: string;
}

// Defining the Experience interface
export interface IExperience extends Document {
  title: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

export interface Iprofilesummary extends Document {
    summary: string;   
    minlength: 10; 
}

// Defining the Resume interface
export interface IResume extends Document {
  name: string;
  image?: string; // Optional field
  contact: {
    phone?: string; // Optional field
    email?: string; // Optional field
    linkedin?: string; // Optional field
    github?: string; // Optional field
  };
  summary?: Iprofilesummary; // Optional field
  education?: IEducation[]; // Optional field
  experience?: IExperience[]; // Optional field
  projects?: IProject[]; // Optional field
  skills?: ISkill; // Optional field
  owner: mongoose.Schema.Types.ObjectId;
  templateId: string;
  permanentdata?: boolean; // Optional field
}

// Defining the Project Schema
const projectSchema: Schema<IProject> = new Schema({
  title: { type: String },
  technologies: { type: String },
  duration: { type: String },
  description: [{ type: String }],
}, { _id: false });

// Defining the Skills Schema
const skillSchema: Schema<ISkill> = new Schema({
  languages: { type: String },
  frameworks: { type: String },
  developerTools: { type: String },
  libraries: { type: String },
}, { _id: false });

// Defining the Education Schema
const educationSchema: Schema<IEducation> = new Schema({
  institution: { type: String },
  degree: { type: String },
  location: { type: String },
  duration: { type: String },
}, { _id: false });

// Defining the Experience Schema
const experienceSchema: Schema<IExperience> = new Schema({
  title: { type: String },
  company: { type: String },
  location: { type: String },
  duration: { type: String },
  responsibilities: [{ type: String }],
}, { _id: false });

const profileSchema: Schema<Iprofilesummary> = new Schema({
    summary:{ type: String },
},{
    _id: false 
});

// Defining the Resume Schema that includes all the above schemas
const resumeSchema: Schema<IResume> = new Schema({
  name: { type: String, required: true, trim: true, index: true },
  image: { type: String }, // Optional field
  contact: {
    phone: { type: String },
    email: { type: String },
    linkedin: { type: String },
    github: { type: String },
  },
  summary: profileSchema,
  education: [educationSchema],
  experience: [experienceSchema],
  projects: [projectSchema],
  skills: skillSchema,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  templateId: { type: String, required: true },
  permanentdata: { type: Boolean }, // Optional field
}, { timestamps: true });

// Model creation
const ResumeModel =
  (mongoose.models.Resume as mongoose.Model<IResume>) ||
  mongoose.model<IResume>('Resume', resumeSchema);

export default ResumeModel;
