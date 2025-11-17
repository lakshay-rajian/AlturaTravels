import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // 'user' or 'admin'
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

export default mongoose.model("User", userSchema);
