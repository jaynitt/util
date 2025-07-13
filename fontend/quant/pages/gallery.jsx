import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

 function Gallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/gallery/all");
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("tags", tags);

    try {
      await axios.post("http://localhost:4000/api/gallery/add", formData);
      setFile(null);
      setCaption("");
      setTags("");
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost:4000/api/gallery/delete", { id });
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
          📸 Gallery Dashboard
        </h1>

        <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-md mb-10">
          <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-3 block w-full text-sm text-gray-500"
          />
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption"
            className="mb-3 block w-full border px-3 py-2 rounded text-sm"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="mb-3 block w-full border px-3 py-2 rounded text-sm"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center">Gallery</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white shadow-md rounded overflow-hidden flex flex-col"
            >
              <img
                src={img.imageUrl}
                alt={img.caption}
                className="object-cover h-48 w-full"
              />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold">{img.caption}</p>
                  <p className="text-xs text-gray-500">
                    {img.tags.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(img._id)}
                  className="mt-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;