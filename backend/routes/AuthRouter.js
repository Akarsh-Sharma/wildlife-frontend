import { Router } from 'express'
import { UserRegister } from '../controllers/UserRegister.js'
const router = Router()

//router.post('/signin', UserSignIn)
router.post('/register', UserRegister)

export default router