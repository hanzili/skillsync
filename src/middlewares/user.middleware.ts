import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/userUtils'
import userService from '../services/user.service'

interface CustomRequest extends Request {
    userId?: string;
  }

export function authenticateJWT(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.header('Authorization')
  if (!token) return res.status(403).send('Access denied. No token provided.')

  try {
    req.userId = verifyToken(token) as string
    next()
  } catch (ex) {
    res.status(400).send('Invalid token.')
  }
}

export function authorize(roles: string[] = []) {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        return res.status(401).send('Authentication required')
      }
      const isAuthorized = await userService.authorize(req.userId, roles)
      if (!isAuthorized)
        return res.status(403).send('Forbidden: insufficient privileges')
      next()
    } catch (error) {
      res.status(403).send('Forbidden: insufficient privileges')
    }
  }
}
