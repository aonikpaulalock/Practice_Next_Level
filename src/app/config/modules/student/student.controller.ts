import { Request, Response } from "express";
import { StudentService } from "./student.service";
// import { z } from "zod";
// import studentJoiValidationSchema from "./student.joi.validation";
import studentZodValidationSchema from "./student.zod.validation";
const createStudentIntoDB = async (req: Request, res: Response) => {
  try {
    // validation useing zod


    const { student } = await req.body;
    // useing joi
    // const { error, value } = studentJoiValidationSchema.validate(student);
    //useing zod
    const zodValidationParse = studentZodValidationSchema.parse(student)
    const result = await StudentService.StudentServiceCreate(zodValidationParse)
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: "somethings went wrong",
    //     error: error.details
    //   })
    // }
    res.status(200).json({
      success: true,
      message: "successFully Created",
      data: result
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "somethings went wrong",
      error
    })
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
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message || "somethings went wrong",
      error
    })
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
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message || "somethings went wrong",
      error
    })
  }
}
const GetDeleteStudentIntoDB = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await StudentService.GetDeleteStudentService(userId);
    res.status(200).json({
      success: true,
      message: "successfully get data",
      data: result
    })
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message || "somethings went wrong",
      error
    })
  }
}


export const StudentController = {
  createStudentIntoDB,
  GetAllStudentIntoDB,
  GetSingleStudentIntoDB,
  GetDeleteStudentIntoDB
}