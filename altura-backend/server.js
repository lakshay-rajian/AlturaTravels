import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";
import packageRoutes from "./routes/packages.js";
import blogRoutes from "./routes/blogs.js";
import uploadRoutes from "./routes/uploads.js";
import path from "path";
import reviewRoutes from "./routes/reviews.js";
import enquiryRoutes from "./routes/enquiries.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/api/packages", packageRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/enquiries", enquiryRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log(err));
