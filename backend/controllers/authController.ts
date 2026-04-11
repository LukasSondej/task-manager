import { Request, Response } from "express";
import { prisma } from "../db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthRequest } from "../middlewares/authMiddleware";
  const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;
export const loginUser = async(req: Request, res: Response) => {
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

      const accessToken = jwt.sign({ id: user.id }, ACCESS_SECRET, {expiresIn: '15m'});
      const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {expiresIn: '15d'});
      
      await prisma.user.update({
        where: {id: user.id}, 
        data: {refreshToken: refreshToken}
      })
      

      return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken})
    }
  }
}


export const refreshToken = async(req: AuthRequest, res: Response) => {
  try {
    const decoded = jwt.verify(req.body.refreshToken, REFRESH_SECRET) as {id: number}
    const user = await prisma.user.findUnique({where: {id: decoded.id}})
    
    if(req.body.refreshToken != user?.refreshToken){
      return res.status(401).json({ message: "Invalid or revoked refresh token" })
    } else {
    
      const newAccessToken = jwt.sign({id: decoded.id}, ACCESS_SECRET, {expiresIn: "15m"})
      return res.status(200).json({ accessToken: newAccessToken })
    }
  } catch(error) {
    return res.status(401).json({ message: "Invalid or expired refresh token" })
  }
}

export const logOutUser = async(req: AuthRequest, res: Response) => {
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
}