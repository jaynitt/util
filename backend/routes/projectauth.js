import Project from "../model/project.js";
import express from "express";
const router = express.Router();


// Add project
router.post("/addproject", async (req, res) => {
  const { title, description, technologies, status, links } = req.body;
  try {
    const project = new Project({ title, description, technologies, status, links });
    await project.save();
    res.json({ message: "Project added successfully", project });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error adding project" });
  }
});

// Edit project
router.post("/editproject", async (req, res) => {
  const { id, title, description, technologies, status, links } = req.body;
  const updateFields = {};
  if (title){ updateFields.title=title };
  if (description) updateFields.description = description;
  if (technologies) updateFields.technologies = technologies;
  if (status) updateFields.status = status;
  if (links) updateFields.links = links;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error updating project" });
  }
});
// Get all projects  
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error fetching projects" });
  }
});
router.post("/deleteproject",async(req,res)=>{
   const { id } = req.body;
   console.log(id);
   try {
     const deleted= await Project.findByIdAndDelete(id);
     if(!deleted){
      console.log("Project not found");
      res.json({ message: "Project not found" });
     }
     res.json({ message: "Project deleted successfully" });
   } catch (error) {
      console.log(error);
      res.json({ message: "Error deleting project" });
      
   }
})
export default router;