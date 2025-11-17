// routes/booking.js
import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Package from "../models/Package.js";
import authMiddleware from "../middleware/auth.js";
import nodemailer from "nodemailer";

const router = express.Router();

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking and send confirmation email
 * @access  Private (only logged-in users)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { packageId, travelers, date } = req.body;

    if (!packageId || !travelers || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const selectedPackage = await Package.findById(packageId);
    if (!selectedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBooking = new Booking({
      userId: req.user.id,
      packageId,
      packageName: selectedPackage.name,
      travelers,
      date,
      status: "pending",
    });

    await newBooking.save();

    // Optional: link booking to user document (not required for functionality)
    try {
      user.bookings.push(newBooking._id);
      await user.save();
    } catch (_) {}

    // Send confirmation email
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Your Booking Confirmation - Altura Travels",
        html: `
          <h2>Hi ${user.name},</h2>
          <p>Thank you for booking with Altura Travels.</p>
          <p><strong>Package:</strong> ${selectedPackage.name}</p>
          <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
          <p><strong>Travelers:</strong> ${travelers}</p>
          <p>Status: Pending confirmation</p>
          <p>We will contact you soon with further details.</p>
          <p>— Altura Travels</p>
        `,
      });
    } catch (emailErr) {
      // Do not fail booking creation if email fails
      console.error("Email send failed:", emailErr.message);
    }

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/bookings/my
 * @desc    Get all bookings for logged-in user
 * @access  Private
 */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/bookings/:id/cancel
 * @desc    Cancel a user's own booking
 * @access  Private
 */
router.put("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ _id: id, userId: req.user.id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin-only middleware
function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}

/**
 * @route   GET /api/bookings/admin
 * @desc    Get all bookings (admin)
 * @access  Admin
 */
router.get("/admin", authMiddleware, adminOnly, async (_req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate({ path: "packageId", model: "Package" })
      .populate({ path: "userId", model: "User", select: "name email" });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/bookings/:id/status
 * @desc    Update booking status (admin)
 * @access  Admin
 */
router.put("/:id/status", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Status updated", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
