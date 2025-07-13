import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Project() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    status: "ongoing",
    links: "",
  });
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    status: "ongoing",
    links: "",
  });

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/projects/addproject", formData);
      setFormData({ title: "", description: "", technologies: "", status: "ongoing", links: "" });
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      alert("Error adding project");
    }
  };

  // Edit logic
  const openEditForm = (project) => {
    setEditId(project._id);
    setEditFormData({
      title: project.title || "",
      description: project.description || "",
      technologies: project.technologies || "",
      status: project.status || "ongoing",
      links: project.links || "",
    });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/projects/editproject", { id: editId, ...editFormData });
      setEditId(null);
      setEditFormData({ title: "", description: "", technologies: "", status: "ongoing", links: "" });
      fetchProjects();
    } catch (error) {
      alert("Error updating project");
    }
  };

  // Delete logic
  const deleteProject = async (id) => {
    try {
     const res= await axios.post("http://localhost:4000/api/projects/deleteproject", { id });
      fetchProjects();
    } catch (error) {
      alert("Error deleting project");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex w-screen h-screen mb-1">
        {/* Left panel: Add project */}
        <div className="flex justify-center items-center flex-col h-screen w-[40vw] bg-white">
          <h1 className="mt-1 text-3xl text-center text-blue-950 p-2 ">Add projects here</h1>
          <button className="bg-blue-700 text-white px-4 py-2 rounded mb-4" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "Add Project +"}
          </button>
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 p-4 bg-[#312C9A] z-10 backdrop-blur-2xl w-[25vw] mx-auto rounded-xl text-white"
            >
              <h2 className="text-lg font-bold text-center">Add Project</h2>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none"
                required />
              <textarea
                name="description"
                placeholder="Brief Description"
                value={formData.description} onChange={handleChange}
                className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none"
                required></textarea>
              <input
                type="text"
                name="technologies"
                placeholder="Technologies (comma-separated)"
                value={formData.technologies} onChange={handleChange}
                className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none"
                required />
              <select name="status"
                value={formData.status}
                onChange={handleChange}
                className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none">
                <option value="ongoing" className="text-black">Ongoing</option>
                <option value="completed" className="text-black">Completed</option>
              </select>
              <input
                type="text"
                name="links"
                placeholder="Link (GitHub, Demo, etc.)"
                value={formData.links}
                onChange={handleChange}
                className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none" />
              <button
                type="submit"
                className="bg-white text-[#312C9A] px-4 py-2 rounded-3xl font-semibold hover:bg-gray-200">Submit</button>
            </form>
          )}
          {editId && (
            <form onSubmit={handleEditFormSubmit} className="flex flex-col gap-3 p-4 bg-[#312C9A] z-10 backdrop-blur-2xl w-[25vw] mx-auto rounded-xl text-white mt-4">
              <h2 className="text-lg font-bold text-center">Edit Project</h2>
              <input type="text" name="title" placeholder="Title" value={editFormData.title} onChange={handleEditFormChange} className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none" required />
              <textarea name="description" placeholder="Brief Description" value={editFormData.description} onChange={handleEditFormChange} className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none" required></textarea>
              <input type="text" name="technologies" placeholder="Technologies (comma-separated)" value={editFormData.technologies} onChange={handleEditFormChange} className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none" required />
              <select name="status" value={editFormData.status} onChange={handleEditFormChange} className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none">
                <option value="ongoing" className="text-black">Ongoing</option>
                <option value="completed" className="text-black">Completed</option>
              </select>
              <input type="text" name="links" placeholder="Link (GitHub, Demo, etc.)" value={editFormData.links} onChange={handleEditFormChange} className="bg-transparent border border-white px-3 py-2 rounded-3xl focus:outline-none" />
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
                <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          )}
        </div>
        {/* Right panel: List projects */}
        <div className="bg-black w-[60vw] h-screen overflow-y-auto p-8">
          <h2 className="text-3xl text-white mb-6 font-bold">All Projects</h2>
          {projects.length === 0 && <div className="text-white">No projects found.</div>}
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-[#312C9A]">{project.title}</div>
                <div>
                  <button className="text-blue-700 font-bold mr-2 hover:text-blue-950" onClick={() => openEditForm(project)}>Edit</button>
                  <button className="text-red-700 font-bold hover:text-red-950" onClick={() => deleteProject(project._id)}>Delete</button>
                </div>
              </div>
              <div className="text-gray-700">{project.description}</div>
              <div className="text-sm text-gray-500">Technologies: {project.technologies}</div>
              <div className="text-sm text-gray-500">Status: {project.status}</div>
              {project.links && <a href={project.links} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{project.links}</a>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Project;
