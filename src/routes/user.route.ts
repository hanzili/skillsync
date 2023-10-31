import express from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user.controller'
import { authenticateJWT, authorize } from '../middlewares/user.middleware'

const router = express.Router()

router.post(
  '/register',
  [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  userController.register,
)

router.post('/login', userController.login)

router.get(
  '/profile/:id',
  authenticateJWT,
  authorize(['admin']),
  userController.getUserProfile,
)

router.get(
  '/profile',
  authenticateJWT,
  authorize(['admin']),
  userController.getUsersProfile,
)

router.put(
  '/profile/:id',
  authenticateJWT,
  authorize(['admin']),
  userController.updateUserProfile,
)

router.delete(
  '/:id',
  authenticateJWT,
  authorize(['admin']),
  userController.deleteUser,
)

export default router
