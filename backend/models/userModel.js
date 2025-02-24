import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Enrollment_Number: {
    type: String,
    required: true,
    unique: true,
  },
  otp_verify: {
    type: Boolean,
    default: false,
  },
  registration_approval: {
    type: Boolean,
    default: false,
  },
  default_password: {
    type: String,
    required: false,
  },
  permanent_password: {
    type: String,
    required: false,
  },
  Title: {
    type: String,
    required: true,
  },
  Name_with_Initials: {
    type: String,
    required: true,
  },
  Name_denoted_by_Initials: {
    type: String,
    required: true,
  },
  Enrollment_Date:{
    type: String,
    required: true,
  },
  ID_IssueDate:{
    type: String,
    required: true,
  },
  AcademicYear:{
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
    age: { type: Number, required: true },
    citizenship: { type: String, required: true },
    country: { type: String, required: true},
    citizenship_from:{type: String, required: true},
    PI:{ type:String, required:true}
  },
  Details_of_Parents_or_Guardians: {
    Name: { type: String, required: true },
    Occupation: { type: String, required: true },
    Work_Place_Address: { type: String, required: true },
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
    
  },
  signature:{
    type: String,
    required: true,
    
  },
  Documents: {
    UGC_Letter: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    BC: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    NIC: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    OL: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    AL: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    A3: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    A4: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    A5: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    A6: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
    Attestation: {
      Name: { type: String, required: true },
      path: { type: String, required: true },
    },
  },
});

export default mongoose.model("users", userSchema);
