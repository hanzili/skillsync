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

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const user = await UserService.getUser(userId)
      res.json(user)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const user = await UserService.getUsers()
      res.json(user)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const updateFields = req.body
      const updatedUser = await UserService.changeUserInfo(userId, updateFields)
      res.json(updatedUser)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const deletedUser = await UserService.deleteUser(userId)
      res.json({ message: 'User deleted successfully', deletedUser })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export default new UserController()
