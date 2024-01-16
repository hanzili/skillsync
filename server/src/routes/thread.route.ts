import express from 'express'
import ThreadController from '../controllers/thread.controller'
import { authenticateJWT } from '../middlewares/user.middleware'

const router = express.Router()

router.get('/:threadId', ThreadController.getThread)
router.post('/:forumId', authenticateJWT, ThreadController.createThread)
router.put('/:threadId', authenticateJWT, ThreadController.updateThread)
router.delete('/:threadId', authenticateJWT, ThreadController.deleteThread)

export default router
