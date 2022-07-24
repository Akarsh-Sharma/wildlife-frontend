import { Router } from 'express'
import { SignIn } from '../controllers/BackendSignIn.js'
const router = Router()

router.post('/', SignIn)

export default router