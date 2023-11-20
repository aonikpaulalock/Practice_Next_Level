export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string
}

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
}

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string
}

export interface Student {
  id: string;
  name: UserName;
  gender: "male" | "female";
  email: string;
  dateOfBrith: string;
  contactNo: string;
  emergencyNo: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked"
}