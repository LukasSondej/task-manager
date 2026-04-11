import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config';
import cors from 'cors'
import taskRouter from './routes/taskRoutes';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';

const app = express()
const corsOptions = {
  origin: 'http://localhost:5173',
 credentials: true
}
app.use(cors(corsOptions))
app.use(express.json())
const port = 3000

app.use("/tasks", taskRouter);
app.use("/", authRouter);
app.use("/", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ 
    message: "Something went wrong on the server side!",
    error: err.message
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})