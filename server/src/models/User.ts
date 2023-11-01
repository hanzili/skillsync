import mongoose, { Document, Schema } from 'mongoose'
import { hashPassword, comparePasswords } from '../utils/user.utils'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  role: string
  comparePassword: (candidatePassword: string) => Promise<boolean>
  enrolledRoadmaps: Schema.Types.ObjectId[]
  createdRoadmaps: Schema.Types.ObjectId[]
}

export interface Profile {
  username: string
  email: string
  enrolledRoadmaps: Schema.Types.ObjectId[]
  createdRoadmaps: Schema.Types.ObjectId[]
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  enrolledRoadmaps: [{ type: Schema.Types.ObjectId, ref: 'Roadmap' }],
  createdRoadmaps: [{ type: Schema.Types.ObjectId, ref: 'Roadmap' }],
})

// Pre-save hook to hash the password
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await hashPassword(this.password)
  }
  next()
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return comparePasswords(candidatePassword, this.password)
}

const User = mongoose.model<IUser>('User', userSchema)
export default User
