import { prisma } from "../db"
import { AuthRequest } from "../middlewares/authMiddleware"
import {Response} from 'express'
import { taskSchema } from "../schemas"
 export const getTasks = async(req: AuthRequest, res: Response) => {
  const tasks = await prisma.task.findMany({where: {userId: req.user?.id}, orderBy: {id: 'desc'}})
 res.json(tasks)
}


export const addTask = async(req: AuthRequest, res: Response) => {
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
}

export const updateTask = async(req: AuthRequest, res: Response) => {
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
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const taskId =  req.params.id;
  if(!req.user?.id){
  return res.status(403).json({message: "i cant"})
}
  const deleteTask = await prisma.task.deleteMany({
    where: { id: Number(taskId), userId: req.user.id }
  })
  res.send(deleteTask)
}