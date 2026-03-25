import express from 'express'
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from './generated/prisma/client';
import 'dotenv/config';
import { taskSchema, userSchema } from './schemas';
import jwt from 'jsonwebtoken';
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
const app = express()
app.use(express.json())
const port = 3000


app.post('/user', async(req, res) => {

const result = userSchema.safeParse(req.body)
if(!result.success){
  return res.status(400).json({
    message: "invalid data",
  details: result.error.issues
    
  })
}
const user = await prisma.user.create({
  data: {email: req.body.email,
    password: req.body.password
  }
 })
 const payload = {userId: user.id}
 var token = jwt.sign(payload, 'toJestTajneHasloMoje');
  res.json({message:"udalo sie",user: user, token: token})



})
app.get('/user', async(req, res) => {
 const user = await prisma.user.findMany()
  res.json(user)
})
app.get('/tasks', async(req, res) => {
 const tasks = await prisma.task.findMany()
  res.json(tasks)
})
app.get('/tasks/:id', async(req, res) => {
  const taskId = req.params.id;
  const task = await prisma.task.findUnique({
   where: {id: Number(taskId)}
  })
   res.json(task)
})
app.post('/tasks', async(req, res) => {
 
const result = taskSchema.safeParse(req.body)
if(!result.success){
  return res.status(400).json({
    message: "invalid data",
     details: result.error.issues
  })
}

 const task = await prisma.task.create({
    data: req.body
  
  })
      res.json(task)

 
 

})
app.put('/tasks/:id', async(req, res) => {
  
  const result = taskSchema.safeParse(req.body)
  if(!result.success){
      return res.status(400).json({
    message: "invalid data",
     details: result.error.issues
  })
  }
   const taskId =  req.params.id;
    const task = await prisma.task.update({
    data: {title: req.body.title,
      description: req.body.description,
      status: req.body.status
    },
    where: {id: Number(taskId)}
  })
 res.json(task)



 
})
app.delete('/tasks/:id', async (req, res) => {
   const taskId =  req.params.id;
   const deleteTask =await prisma.task.delete({
    where: {id: Number(taskId)}
   })
  res.send(deleteTask)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
