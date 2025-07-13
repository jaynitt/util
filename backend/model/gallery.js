import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true }, // to delete from cloudinary
  caption: { type: String },
  tags: [{ type: String }]
});

export default mongoose.model("Gallery", gallerySchema);
