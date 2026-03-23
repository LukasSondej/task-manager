import express from 'express'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express()
app.use(express.json())
const port = 3000
app.post('/user', async(req, res) => {
 const user = await prisma.user.create({
  data: {email: req.body.email,
    password: req.body.password
  }
 })
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
  const task = await prisma.task.create({
    data: req.body
  })
  res.json(task)
})
app.put('/tasks/:id', async(req, res) => {
   const taskId =  await req.params.id;
    const task = prisma.task.update({
    data: {title: req.body.title,
      desription: req.body.description,
      status: req.body.status
    },
    where: {id: Number(taskId)}
  })
  res.json(task)
})
app.delete('/tasks/:id', async (req, res) => {
   const taskId = await req.params.id;
   const deleteTask = prisma.task.delete({
    where: {id: Number(taskId)}
   })
  res.send(deleteTask)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
