import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Enrollment_Number: {
    type: String,
    required: true,
    unique: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Full_Name: {
    type: String,
    required: true,
  },
  Initials: {
    type: String,
    required: true,
  },
  Address: {
    Permenant_Address: { type: String, required: true },
    Province: { type: String, required: true },
    District: { type: String, required: true },
    Divional_Secretarial: { type: String, required: true },
    NIC: { type: String, required: true, unique: true },
    Phone_Number: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
  },
  Educational_Qualifications: {
    AL_year: { type: Number, required: true },
    Index_AL: { type: Number, required: true, unique: true },
    Zscore: { type: Number, required: true, unique: true },
    AL_result: {
      Subject1: {
        Name: { type: String, required: true },
        result: { type: String, required: true },
      },
      Subject2: {
        Name: { type: String, required: true },
        result: { type: String, required: true },
      },
      Subject3: {
        Name: { type: String, required: true },
        result: { type: String, required: true },
      },
    },
  },
  Details_of_Citizen: {
    race: { type: String, required: true },
    gender: { type: String, required: true },
    civil_status: { type: String, required: true },
    religion: { type: String, required: true },
    nationality: { type: String, required: true },
    birth_date: { type: Date, required: true },
    country: {
      desent: { type: String },
      registration: { type: String },
    },
  },
  Details_of_Parents: {
    Name_of_Parents: { type: String, required: true },
    Occupation: { type: String, required: true },
    Address: { type: String, required: true },
    Phone_Number: { type: String, required: true },
  },
  Emergency_Person: {
    Name: { type: String, required: true },
    Relationship: { type: String, required: true },
    Phone_Number: { type: String, required: true },
    Address: { type: String, required: true },
  },
  profile_photo: {
    type: String,
    required: true,
    default: "default_profile.png",
  },
  Documents: {
    UGC_Letter: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    Birth_Certificate: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    School_leaving: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    NIC: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    OL_Result_Sheet: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    AL_Result_Sheet: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    Bank_Slip: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    Information_Sheet: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    Declaration_Form: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    Games_Form: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    Hostal_Accomodation: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    Digital_Signature: {
      signatureData: {
        type: String, // Base64-encoded string or file path
        required: false,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      signedBy: {
        type: String,
        required: false,
      },
    },
    Attestaion_Form: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
  },
});

export default mongoose.model("users", userSchema);
