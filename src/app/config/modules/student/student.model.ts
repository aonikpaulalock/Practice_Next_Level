import { Schema, model } from "mongoose";
import { TGuardian, TLocalGuardian, TStudent, TUserName, studentModel } from "./student.interface";
import bcrypt from "bcrypt"
import config from "../..";
// import validator from 'validator';
// import isEmail from "validator/lib/isEmail";
const userSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [20, "firstName is to long"],
    // validate: {
    //   validator: function (value: string) {
    //     const capitalize = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    //     return capitalize === value
    //   },
    //   message: "{VALUE} is must be capitalize"
    // }
  },
  middleName: {
    type: String,
    required: [true, "Middle name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE} is not valid"
    // }
  }
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContact: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContact: {
    type: String,
    required: [true, "Mother's contact number is required"],
  }
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

const studentSchema = new Schema<TStudent, studentModel>({
  // Instance useing <TStudent, studentModel, StudentMethods>
  id: { type: String, required: [true, "Student ID is required"], unique: true, maxlength: [20, "password is to long"] },
  password: { type: String, required: [true, "Password is required"] },
  name: {
    type: userSchema,
    required: [true, "Student name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "{VALUE} is not a valid gender. Must be 'male', 'female', or 'others'."
    },
    required: [true, "Gender is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    // validate: {
    //   validator: (value: string) => isEmail(value),
    //   message: "{VALUE} is not valid"
    // }
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of birth is required"],
    unique: true
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
  },
  emergencyNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: [
      "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
    ],
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian information is required"],
  },
  profileImg: {
    type: String,
    required: [true, "Profile image path is required"],
  },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: {
    virtuals: true
  }
});

// Will Document middleware
studentSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  // console.log(this, "will save data with pre middleware")
  user.password = await bcrypt.hash(user.password, Number(config.soltRound));
  next()
})

// Will Post middleware
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
})


// Creating Query Middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// findOne
studentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } })
  next()
})

// Aggregation middleware
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// Virtuals
studentSchema.virtual("fullname").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// studentSchema.post("find", function (next) {
//   next()
// })




// Creating Custom Instance methods
// studentSchema.methods.isUserExists = async function (id) {
//   const isUExists = await Student.findOne({ id })
//   return isUExists
// }


// Creating static methods
studentSchema.statics.isUserExists = async function (id: string) {
  const userExists = await Student.findOne({ id })
  return userExists
}



export const Student = model<TStudent, studentModel>("student", studentSchema);
