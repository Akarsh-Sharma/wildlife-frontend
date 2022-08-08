import { Router } from 'express'
import { UserSignIn } from '../controllers/UserSignIn.js'
const router = Router()

router.post('/', UserSignIn)

export default router