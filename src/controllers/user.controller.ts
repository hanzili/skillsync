import { Request, Response } from 'express'
import UserService from '../services/user.service'

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body
      const token = await UserService.register(username, email, password)
      res.status(201).json({ token })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const token = await UserService.login(email, password)
      if (!token) return res.status(401).send('Invalid email or password')
      res.json({ token })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export default new UserController()
