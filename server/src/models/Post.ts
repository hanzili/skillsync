import mongoose, { Document, Schema } from 'mongoose'

export interface IPost extends Document {
  text: string
  images: Array<string>
  creator: mongoose.Types.ObjectId
  thread: mongoose.Types.ObjectId
}

const postSchema = new Schema({
  text: String,
  images: [String],
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  thread: { type: Schema.Types.ObjectId, ref: 'Thread' },
})

const Post = mongoose.model<IPost>('Post', postSchema)
export default Post
