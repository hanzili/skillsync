import jwt from 'jsonwebtoken'
import UserDao from '../dao/user.dao'

class UserService {
  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<string> {
    const user = await UserDao.createUser(username, email, password)
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '3h',
    })
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await UserDao.findUserByEmail(email)
    if (!user) return null

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return null

    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '3h',
    })
  }
}

export default new UserService()
