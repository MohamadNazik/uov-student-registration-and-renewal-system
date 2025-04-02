import mongoose from "mongoose";

const adminUpdatesSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    updateType: {
      type: String,
      enum: ["Registration", "Renewal"],
      required: true,
    },
    updateMessage: {
      type: String,
      required: false,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: false,
    },
    idCardIssueDate: {
      type: Date,
      required: false,
    },
    academicYear: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("adminUpdates", adminUpdatesSchema);
