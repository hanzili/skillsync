import UserDao from '../dao/user.dao'
import { IUser } from '../models/User'
import { generateToken } from '../utils/userUtils'

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
}

export default new UserService()
