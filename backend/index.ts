import express, { NextFunction, Request, Response } from 'express'
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from './generated/prisma/client';
import 'dotenv/config';
import { taskSchema, userSchema } from './schemas';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors'
export interface AuthRequest extends Request {
  user?: {
    id: number;
  }
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

export const prisma = new PrismaClient({ adapter });
const app = express()
app.use(cors())
app.use(express.json())
const port = 3000
const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if(!req.headers['authorization']){
    return res.status(401).json({ message: "Missing authorization header" })
  } else {
    const token = req.headers['authorization'].split(" ")[1]
    try {
      const decodedToken = jwt.verify(token, ACCESS_SECRET) as { id: number };
      req.user = decodedToken;
      next()
    } catch(error) {
      return res.status(403).json({ message: "Invalid or expired access token" }) 
    }
  }
}
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
  
  res.status(200).json({ user: registeredUser});
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
      const access_token = jwt.sign({ id: user.id }, ACCESS_SECRET, {expiresIn: '15m'});
      const refresh_token = jwt.sign({ id: user.id }, REFRESH_SECRET, {expiresIn: '15d'});
      
      const user_token_refresh = await prisma.user.update({
        where: {id: user.id}, 
        data: {refreshToken: refresh_token}
      })
      
      return res.status(200).json({ access_token: access_token, refresh_token: refresh_token})
    }
  }
})

app.post("/refresh",async(req: AuthRequest, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh_token, REFRESH_SECRET) as {id: number}
    const user = await prisma.user.findUnique({where: {id: decoded.id}})
    
    if(req.body.refresh_token != user?.refreshToken){
      return res.status(401).json({ message: "Invalid or revoked refresh token" })
    } else {
      const new_access_token = jwt.sign({id: decoded.id}, ACCESS_SECRET, {expiresIn: "15m"})
      return res.status(200).json({ access_token: new_access_token })
    }
  } catch(error) {
    return res.status(401).json({ message: "Invalid or expired refresh token" })
  }
})


app.post("/logout", verifyToken, async(req: AuthRequest, res: Response) => {
  try {
    if(req.user?.id) {
      await prisma.user.update({
        where: { id: req.user.id }, 
        data: { refreshToken: null }
      });
      return res.status(200).json({ message: "Logout successful" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during logout" });
  }
});

app.get('/user', verifyToken, async(req: AuthRequest, res:Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/tasks', verifyToken, async(req: AuthRequest, res: Response) => {
  const tasks = await prisma.task.findMany({where: {userId: req.user?.id}})
  res.json(tasks)
})

app.get('/tasks/:id', verifyToken, async(req: AuthRequest, res) => {
  const taskId = req.params.id;
  const task = await prisma.task.findFirst({
   where: { id: Number(taskId), userId: req.user?.id }
  })
  res.json(task)
})

app.post('/tasks', verifyToken, async(req: AuthRequest, res: Response) => {
  const result = taskSchema.safeParse(req.body)
  if(!result.success){
    return res.status(400).json({
      message: "Invalid data",
      details: result.error.issues
    })
  }
if(!req.user?.id){
  return res.status(403).json({message: "i cant"})
}
  const task = await prisma.task.create({
   data: {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status, 
      userId: req.user!.id 
    }
    
  })
  res.json(task)
})

app.put('/tasks/:id', verifyToken, async(req: AuthRequest, res: Response) => {
  const result = taskSchema.safeParse(req.body)
  if(!result.success){
    return res.status(400).json({
      message: "Invalid data",
      details: result.error.issues
    })
  }
  
  const taskId =  req.params.id;
  const task = await prisma.task.updateMany({
    data: {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    },
    where: { id: Number(taskId), userId: req.user?.id }
  })
  res.json(task)
})

app.delete('/tasks/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  const taskId =  req.params.id;
  if(!req.user?.id){
  return res.status(403).json({message: "i cant"})
}
  const deleteTask = await prisma.task.deleteMany({
    where: { id: Number(taskId), userId: req.user.id }
  })
  res.send(deleteTask)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})