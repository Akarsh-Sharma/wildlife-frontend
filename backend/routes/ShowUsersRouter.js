import { Router } from 'express'
import { ShowUsers } from '../controllers/ShowUsers.js'
const router = Router()

router.get('/', ShowUsers)

export default router