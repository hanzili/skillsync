import User, { IUser } from '../models/User'
import { createObjectId } from '../utils/common.utils'

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

  // a function that return all users who have enrolled in a roadmap
  async findUsersByEnrolledRoadmap(roadmapId: string): Promise<IUser[]> {
    return User.find({ enrolledRoadmaps: createObjectId(roadmapId) })
  }
}

export default new UserDao()
