import { prisma } from '../db'
import { userSchema } from '../schemas'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { AuthRequest } from '../middlewares/authMiddleware'
export const addNewUser = async (req: Request, res: Response) => {
  const result = userSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      message: 'Invalid data',
      details: result.error.issues,
    })
  }
  const email = req.body.email
  const password = req.body.password

  const existingUser = await prisma.user.findUnique({ where: { email: email } })
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const registeredUser = await prisma.user.create({
    data: { email: email, password: hashedPassword },
  })

  res.status(200).json({ user: registeredUser })
}

export const authMe = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
    },
  })
  res.json(user)
}
