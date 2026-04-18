import { Router } from 'express'
import { addNewUser, authMe } from '../controllers/userController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()
router.post('/user', addNewUser)
router.get('/auth/me', verifyToken, authMe)
export default router
