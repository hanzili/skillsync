import { Request, Response } from 'express'
import UserService from '../services/user.service'
import { Profile } from '../models/User'

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

  async getUserProfile(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const user = await UserService.getUser(userId)
      const profile: Profile = {
        username: user.username,
        email: user.email,
        enrolledRoadmaps: user.enrolledRoadmaps,
        createdRoadmaps: user.createdRoadmaps,
      }
      res.json(profile)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async getUsersProfile(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers()
      const usersProfile = users.map(
        (user): Profile => ({
          username: user.username,
          email: user.email,
          enrolledRoadmaps: user.enrolledRoadmaps,
          createdRoadmaps: user.createdRoadmaps,
        }),
      )
      res.json(usersProfile)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async updateUserProfile(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const newProfile: Partial<Profile> = req.body
      const updatedUser = await UserService.changeUserInfo(userId, newProfile)
      const updatedProfile: Profile = {
        username: updatedUser.username,
        email: updatedUser.email,
        enrolledRoadmaps: updatedUser.enrolledRoadmaps,
        createdRoadmaps: updatedUser.createdRoadmaps,
      }
      res.json(updatedProfile)
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
