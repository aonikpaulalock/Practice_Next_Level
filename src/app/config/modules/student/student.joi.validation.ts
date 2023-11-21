import Joi from 'joi';

const userNameJoiValidationSchema = Joi.object({
  firstName: Joi.string().max(20).pattern(/^[A-Z][a-z]*$/).required(),
  middleName: Joi.string().required(),
  lastName: Joi.string().pattern(/^[A-Za-z]+$/).required(),
});

const guardianJoiValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContact: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContact: Joi.string().required(),
});

const localGuardianJoiValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentJoiValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameJoiValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.string().required(),
  contactNo: Joi.string().required(),
  emergencyNo: Joi.string().required(),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianJoiValidationSchema.required(),
  localGuardian: localGuardianJoiValidationSchema.required(),
  profileImg: Joi.string().required(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentJoiValidationSchema