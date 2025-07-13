import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type:String,
    required: true,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing",
  },
  links: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;