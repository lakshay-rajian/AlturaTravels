import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["new", "resolved"], default: "new" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Enquiry", enquirySchema);


