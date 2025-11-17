import express from "express";
import Enquiry from "../models/Enquiry.js";
import authMiddleware from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

// Public: create enquiry
router.post("/", async (req, res) => {
  try {
    const created = await Enquiry.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: list enquiries
router.get("/admin", authMiddleware, adminOnly, async (_req, res) => {
  try {
    const list = await Enquiry.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: mark resolved
router.put("/:id/resolve", authMiddleware, adminOnly, async (req, res) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Enquiry not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;


