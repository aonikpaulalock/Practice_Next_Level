import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRouter } from './app/config/modules/student/student.route';
const app: Application = express();

// perser
app.use(express.json());
app.use(cors());

// Use router
app.use("/api/v1/students", studentRouter)

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

export default app;
