import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/userUtils'
import userService from '../services/user.service'

interface CustomRequest extends Request {
  userId?: string
}

interface TokenPayload {
  userId: string
  iat: number
  exp: number
}

export function authenticateJWT(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const bearerToken = req.header('Authorization')
  if (!bearerToken)
    return res.status(403).send('Access denied. No token provided.')

  try {
    const token = bearerToken.split(' ')[1]
    const payload = verifyToken(token) as TokenPayload
    if (!payload.userId) {
      return res.status(400).send('Invalid token.')
    }
    req.userId = payload.userId
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
