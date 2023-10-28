import express from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user.controller' // Import the default export
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
  '/user/:id',
  authenticateJWT,
  authorize(['admin']),
  userController.getUser,
)

router.get(
  '/users',
  authenticateJWT,
  authorize(['admin']),
  userController.getUsers,
)

router.put(
  '/user/:id',
  authenticateJWT,
  authorize(['admin']),
  userController.updateUser,
)

router.delete(
  '/user/:id',
  authenticateJWT,
  authorize(['admin']),
  userController.deleteUser,
)

export default router
