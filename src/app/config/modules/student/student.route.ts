import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

router
  .get("/:userId", StudentController.GetSingleStudentIntoDB)
  .get("/", StudentController.GetAllStudentIntoDB)
  .post("/create-student", StudentController.createStudentIntoDB)

export const studentRouter = router;