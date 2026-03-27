import express, { NextFunction, Request, Response } from 'express'
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from './generated/prisma/client';
import 'dotenv/config';
import { taskSchema, userSchema } from './schemas';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export interface AuthRequest extends Request {
  user?: {
    id: number;
  }
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
const app = express()
app.use(express.json())
const port = 3000

const JWT_SECRET = "kaljfdokdsjmvnafhj"


app.post('/user', async(req, res) => {
  const result = userSchema.safeParse(req.body)
  if(!result.success){
    return res.status(400).json({
      message: "Invalid data",
      details: result.error.issues
    })
  }
  const email = req.body.email;
  const password = req.body.password;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const registeredUser = await prisma.user.create({
    data: { email: email, password: hashedPassword }
  })
  
  const token = jwt.sign({ id: registeredUser.id }, JWT_SECRET)
  
  res.status(200).json({ user: registeredUser, token: token });
})

app.post('/login', async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const user = await prisma.user.findUnique({ where: { email: email } })
  
  if(!user){
    return res.status(404).json({ message: "User not found" })
  } else {
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if(!isPasswordValid){
      return res.status(401).json({ message: "Invalid password" }) 
    } else {
      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      return res.status(200).json({ token: token })
    }
  }
})

const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if(!req.headers['authorization']){
    return res.status(401).json({ message: "Missing authorization header" })
  } else {
    const token = req.headers['authorization'].split(" ")[1]
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as { id: number };
      req.user = decodedToken;
      next()
    } catch(error) {
      return res.status(403).json({ message: "Invalid or expired token" }) 
    }
  }
}

app.get('/user', verifyToken, async(req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/tasks', verifyToken, async(req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

app.get('/tasks/:id', verifyToken, async(req, res) => {
  const taskId = req.params.id;
  const task = await prisma.task.findUnique({
   where: { id: Number(taskId) }
  })
  res.json(task)
})

app.post('/tasks', verifyToken, async(req, res) => {
  const result = taskSchema.safeParse(req.body)
  if(!result.success){
    return res.status(400).json({
      message: "Invalid data",
      details: result.error.issues
    })
  }

  const task = await prisma.task.create({
    data: req.body
  })
  res.json(task)
})

app.put('/tasks/:id', verifyToken, async(req, res) => {
  const result = taskSchema.safeParse(req.body)
  if(!result.success){
    return res.status(400).json({
      message: "Invalid data",
      details: result.error.issues
    })
  }
  
  const taskId =  req.params.id;
  const task = await prisma.task.update({
    data: {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    },
    where: { id: Number(taskId) }
  })
  res.json(task)
})

app.delete('/tasks/:id', verifyToken, async (req, res) => {
  const taskId =  req.params.id;
  const deleteTask = await prisma.task.delete({
    where: { id: Number(taskId) }
  })
  res.send(deleteTask)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})