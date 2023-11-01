import mongoose from 'mongoose'

export const createObjectId = (id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(id)
}
