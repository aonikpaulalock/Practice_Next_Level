import { Model } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string
}

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
}

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string
}

export interface TStudent {
  id: string;
  password: string
  name: TUserName;
  gender: "male" | "female" | "others";
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked",
  isDeleted: boolean
}
// Creating static methods
export interface studentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

// Creating Custom Instance methods

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// export type studentModel = Model<TStudent, Record<string, never>, StudentMethods>;