import { Router } from 'express'
import { SignIn } from '../controllers/BackendSignIn.js'
const router = Router()

router.get('/', SignIn)

export default router