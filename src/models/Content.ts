import mongoose, { Document, Schema } from 'mongoose'

export interface IContent extends Document {
  type: 'video' | 'article' | 'assignment' | 'quiz'
  url: string
  title: string
  description: string
}

const contentSchema = new Schema({
  type: { type: String, enum: ['video', 'article', 'assignment', 'quiz'] },
  url: String,
  title: String,
  description: String,
})

const Content = mongoose.model<IContent>('Content', contentSchema)
export default Content
