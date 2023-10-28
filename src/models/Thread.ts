import mongoose, { Document, Schema } from 'mongoose'

export interface IThread extends Document {
  title: string
  posts: Array<mongoose.Types.ObjectId>
  creator: mongoose.Types.ObjectId
  forum: mongoose.Types.ObjectId
}

const threadSchema = new Schema({
  title: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  forum: { type: Schema.Types.ObjectId, ref: 'Forum' },
})

const Thread = mongoose.model<IThread>('Thread', threadSchema)
export default Thread
