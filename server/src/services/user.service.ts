import UserDao from '../dao/user.dao'
import { IUser } from '../models/User'
import { generateToken } from '../utils/user.utils'

class UserService {
  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<string> {
    const existingUser = await UserDao.findUserByEmail(email)
    if (existingUser) throw new Error('User with this email already exists')
    const user = await UserDao.createUser(username, email, password)
    return generateToken(user.id)
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await UserDao.findUserByEmail(email)
    if (!user) throw new Error('Invalid email or password')

    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new Error('Invalid email or password')

    return generateToken(user.id)
  }

  async getUser(userId: string): Promise<IUser> {
    const user = await UserDao.findUserById(userId)
    if (!user) throw new Error('User not found')
    return user
  }

  async getUsers(): Promise<IUser[]> {
    const users = await UserDao.findAllUsers()
    if (!users || users.length === 0) throw new Error('No users found')
    return users
  }

  async changeUserInfo(
    userId: string,
    updateFields: Partial<IUser>,
  ): Promise<IUser> {
    const updatedUser = await UserDao.updateUser(userId, updateFields)
    if (!updatedUser) throw new Error('User not found')
    return updatedUser
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await UserDao.deleteUser(userId)
    if (!deletedUser) throw new Error('User not found')
    return deletedUser
  }

  async authorize(userId: string, requiredRoles: string[]): Promise<boolean> {
    const user = await UserDao.findUserById(userId)
    if (!user) throw new Error('User not found')
    return requiredRoles.includes(user.role)
  }

  async addCreatedRoadmap(userId: string, roadmapId: string): Promise<IUser> {
    const updatedUser = await UserDao.addCreatedRoadmap(userId, roadmapId)
    if (!updatedUser) throw new Error('User not found')
    return updatedUser
  }

  async deleteCreatedRoadmap(
    userId: string,
    roadmapId: string,
  ): Promise<IUser> {
    const updatedUser = await UserDao.deleteCreatedRoadmap(userId, roadmapId)
    if (!updatedUser) throw new Error('User not found')
    return updatedUser
  }

  async enroll(roadmapId: string, userId: string): Promise<IUser> {
    const updatedUser = await UserDao.enroll(roadmapId, userId)
    if (!updatedUser) throw new Error('User not found')
    return updatedUser
  }

  async unenroll(roadmapId: string, userId: string): Promise<IUser> {
    const updatedUser = await UserDao.unenroll(roadmapId, userId)
    if (!updatedUser) throw new Error('User not found')
    return updatedUser
  }
}

export default new UserService()
