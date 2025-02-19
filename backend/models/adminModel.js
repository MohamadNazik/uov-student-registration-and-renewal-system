import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["dr", "sar", "sar_staff", "far", "far_staff"],
      required: true,
    },
    permissions: { type: [String], required: true },
    faculty: { type: String },
    eSignature: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
