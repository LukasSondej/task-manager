import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';
export interface AuthRequest extends Request {
  user?: {
    id: number;
  }
}
const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
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