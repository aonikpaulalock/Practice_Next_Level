import { Request, Response } from "express";
import { StudentService } from "./student.service";

const createStudentIntoDB = async (req: Request, res: Response) => {
  try {
    const { student } = await req.body;
    const result = await StudentService.StudentServiceCreate(student)
    res.status(200).json({
      success: true,
      message: "successFully Created",
      data: result
    })
  } catch (error) {
    console.log(error)
  }
}

const GetAllStudentIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.GetAllStudentService();
    res.status(200).json({
      success: true,
      message: "successfully get data",
      data: result
    })
  } catch (error) {
    console.log(error)
  }
}
const GetSingleStudentIntoDB = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await StudentService.GetSingleStudentService(userId);
    res.status(200).json({
      success: true,
      message: "successfully get data",
      data: result
    })
  } catch (error) {
    console.log(error)
  }
}


export const StudentController = {
  createStudentIntoDB,
  GetAllStudentIntoDB,
  GetSingleStudentIntoDB
}