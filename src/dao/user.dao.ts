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

  async findUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId)
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email })
  }

  async findAllUsers(): Promise<IUser[]> {
    return User.find()
  }

  async updateUser(
    userId: string,
    updateFields: Partial<IUser>,
  ): Promise<IUser | null> {
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    })
    return updatedUser
  }

  async deleteUser(userId: string): Promise<IUser | null> {
    const deletedUser = await User.findByIdAndDelete(userId)
    return deletedUser
  }

  async addCreatedRoadmap(userId: string, roadmapId: string): Promise<IUser> {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { createdRoadmaps: roadmapId } },
      { new: true },
    )
    if (!updatedUser) {
      throw new Error('User not found')
    }
    return updatedUser
  }

  async deleteCreatedRoadmap(
    userId: string,
    roadmapId: string,
  ): Promise<IUser> {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { createdRoadmaps: roadmapId } },
      { new: true },
    )
    if (!updatedUser) {
      throw new Error('User not found')
    }
    return updatedUser
  }

  async enroll(roadmapId: string, userId: string): Promise<IUser> {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { enrolledRoadmaps: roadmapId } },
      { new: true },
    )
    if (!updatedUser) {
      throw new Error('User not found')
    }
    return updatedUser
  }

  async unenroll(roadmapId: string, userId: string): Promise<IUser> {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { enrolledRoadmaps: roadmapId } },
      { new: true },
    )
    if (!updatedUser) {
      throw new Error('User not found')
    }
    return updatedUser
  }
}

export default new UserDao()
