// models/Package.js
import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Manali Adventure Trip"
  description: { type: String, required: true },
  price: { type: Number, required: true }, // per person price
  location: { type: String, required: true }, // e.g. "Manali, Himachal Pradesh"
  duration: { type: String, required: true }, // e.g. "3 Nights / 4 Days"
  image: { type: String }, // optional, store image URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Package", packageSchema);
