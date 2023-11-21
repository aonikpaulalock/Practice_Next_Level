import { z } from "zod";

const userNameZodValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianZodValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContact: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContact: z.string(),
});

const localGuardianZodValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentZodValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameZodValidationSchema,
  gender: z.enum(['male', 'female', 'others']),
  email: z.string().email(),
  dateOfBirth: z.string(),
  contactNo: z.string(),
  emergencyNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianZodValidationSchema,
  localGuardian: localGuardianZodValidationSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean()
});

export default studentZodValidationSchema