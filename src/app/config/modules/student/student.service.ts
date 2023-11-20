import { Student } from "./student.interface";
import { studentModel } from "./student.model";


const StudentServiceCreate = async (student: Student) => {
  const result = await studentModel.create(student);
  return result
}

const GetAllStudentService = async () => {
  const result = await studentModel.find();
  return result
}

const GetSingleStudentService = async (id: string) => {
  const result = await studentModel.findOne({ id });
  return result
}

export const StudentService = {
  StudentServiceCreate,
  GetAllStudentService,
  GetSingleStudentService
} 