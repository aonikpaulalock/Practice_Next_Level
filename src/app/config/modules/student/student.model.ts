import { Schema, model } from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./student.interface";


const userSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
})

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true
  },
  fatherOccupation: {
    type: String,
    required: true
  },
  fatherContact: {
    type: String,
    required: true
  },
  motherName: {
    type: String,
    required: true
  },
  motherOccupation: {
    type: String,
    required: true
  },
  motherContact: {
    type: String,
    required: true
  }
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
})

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: userSchema,
  gender: ["male", "female"],
  email: {
    type: String,
    required: true
  },
  dateOfBrith: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  emergencyNo: {
    type: String,
    required: true
  },
  bloodGroup: [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
  ],
  presentAddress: {
    type: String,
    required: true
  },
  permanentAddress: {
    type: String,
    required: true
  },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: {
    type: String,
    required: true
  },
  isActive: ["active", "blocked"]
})

export const studentModel = model<Student>("student", studentSchema)