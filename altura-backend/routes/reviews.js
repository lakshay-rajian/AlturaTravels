import express from "express";
import Review from "../models/Review.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Get reviews for a package
router.get("/:packageId", async (req, res) => {
  try {
    const reviews = await Review.find({ packageId: req.params.packageId })
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "name" });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a review (logged in)
router.post("/:packageId", authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.create({
      packageId: req.params.packageId,
      userId: req.user.id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;


