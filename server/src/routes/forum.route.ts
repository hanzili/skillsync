import express from 'express'
import ForumController from '../controllers/forum.controller'

const router = express.Router()

router.get('/:forumId', ForumController.getForum)

export default router
