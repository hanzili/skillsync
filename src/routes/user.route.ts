import express from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user.controller' // Import the default export

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

export default router
