import mongoose from "mongoose";

const studentListSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
    unique: true,
  },
  RegNo: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

export default mongoose.model("studentList", studentListSchema);
