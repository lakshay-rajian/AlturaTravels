import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";
import { storage } from "../config/cloudinary.js";

const router = express.Router();

const upload = multer({ storage });

router.post("/image", authMiddleware, adminOnly, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  // req.file.path will contain the full Cloudinary URL
  const publicUrl = req.file.path;
  res.status(201).json({ url: publicUrl });
});

export default router;


