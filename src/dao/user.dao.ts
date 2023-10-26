import User, { IUser } from '../models/User'

class UserDao {
  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const user = new User({ username, email, password })
    await user.save()
    return user
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email })
  }
}

export default new UserDao()
