import { TStudent } from "./student.interface";
import { Student } from "./student.model";


const StudentServiceCreate = async (studentData: TStudent) => {

  // const student = new Student(studentData) // instance method
  // // Custom instace methods
  // if (await student.isUserExists(student.id)) {
  //   throw Error("User Already Exists")
  // }
  // // student.isUserExists
  // const result = student.save()
  if (await Student.isUserExists(studentData.id)) {
    throw Error("User static already exists")
  }
  // bulid in static method
  const result = await Student.create(studentData);
  return result
}

const GetAllStudentService = async () => {
  const result = await Student.find();
  return result
}

const GetSingleStudentService = async (id: string) => {
  const result = await Student.findOne({ id });
  // aggregation
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result
}
const GetDeleteStudentService = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result
}

export const StudentService = {
  StudentServiceCreate,
  GetAllStudentService,
  GetSingleStudentService,
  GetDeleteStudentService
} 