import mongoose from "mongoose";

const renewalSchema = new mongoose.Schema({
  Enrollment_Number: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: false,
  },
  present_address: {
    type: String,
    required: true,
  },
  receipt_number: {
    type: String,
    required: true,
  },
  submission_date: {
    type: String,
    required: true,
  },
  payment_date: {
    type: String,
    required: true,
  },
  receipt: {
    Name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  current_year_of_study: {
    type: Number,
    required: true,
  },
  renwal_academic_year: {
    type: String,
    required: false,
  },
  renewal_approved: {
    type: Boolean,
    required: false,
  },
});

export default mongoose.model("Renewal", renewalSchema);
