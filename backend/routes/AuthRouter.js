import { Router } from 'express'
import { UserRegister, UserLogIn, authenticateToken } from '../controllers/AuthController.js'
const router = Router()

router.post('/login', UserLogIn)
router.post('/register', UserRegister)

export default router