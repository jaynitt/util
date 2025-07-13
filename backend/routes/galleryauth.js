import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Gallery from "../model/gallery.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "gallery",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), async (req, res) => {
    try {
        const { caption, tags } = req.body;

        const newImage = new Gallery({
            imageUrl: req.file.path,
            publicId: req.file.filename,
            caption,
            tags: tags ? tags.split(",").map(t => t.trim()) : [],
        });

        await newImage.save();
        res.json({ message: "Image uploaded", newImage });
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const images = await Gallery.find();
        res.json(images);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.post("/update", async (req, res) => {
    try {
        const { id, caption, tags } = req.body;

        const updated = await Gallery.findByIdAndUpdate(
            id,
            {
                caption,
                tags: tags ? tags.split(",").map(t => t.trim()) : []
            },
            { new: true }
        );

        if (!updated) return res.json({ message: "Not found" });
        res.json(updated);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.post("/delete", async (req, res) => {
    try {
        const { id } = req.body;

        const image = await Gallery.findById(id);
        if (!image) return res.json({ message: "Not found" });

        await cloudinary.uploader.destroy(image.publicId);
        await Gallery.findByIdAndDelete(id);

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.json({ error: err.message });
    }
});

export default router;
