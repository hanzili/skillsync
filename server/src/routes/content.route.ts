import express from 'express'
import ContentController from '../controllers/content.controller'
import { authenticateJWT } from '../middlewares/user.middleware'

const router = express.Router()

router.get('/:contentId', ContentController.getContent)
router.post('/:roadmapId', authenticateJWT, ContentController.createContent)
router.put('/:contentId', authenticateJWT, ContentController.updateContent)
router.delete('/:contentId', authenticateJWT, ContentController.deleteContent)

export default router
