import { Router } from 'express'
import { verifyToken } from '../middlewares/authMiddleware'
import { addTask, deleteTask, getTasks, updateTask } from '../controllers/taskController'
const router = Router()
router.get('/', verifyToken, getTasks)
router.post('/', verifyToken, addTask)
router.put('/:id', verifyToken, updateTask)
router.delete('/:id', verifyToken, deleteTask)
export default router
