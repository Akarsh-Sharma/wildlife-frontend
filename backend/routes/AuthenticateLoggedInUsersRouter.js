import { Router } from 'express'
import { AuthenticateLoggedInUsers } from '../controllers/AuthenticateLoggedInUsers.js'
const router = Router()

router.post('/', AuthenticateLoggedInUsers)

export default router