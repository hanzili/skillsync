import express from 'express'
import PostController from '../controllers/post.controller'
import { authenticateJWT } from '../middlewares/user.middleware'

const router = express.Router()

router.get('/:postId', PostController.getPost)
router.post('/:threadId', authenticateJWT, PostController.createPost)
router.put('/:postId', authenticateJWT, PostController.updatePost)
router.delete('/:postId', authenticateJWT, PostController.deletePost)

export default router
