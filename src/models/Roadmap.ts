import mongoose, { Document, Schema } from 'mongoose'

export interface IRoadmap extends Document {
  title: string
  description: string
  content: Array<mongoose.Types.ObjectId>
  creator: mongoose.Types.ObjectId
  enrolledUsers: Array<mongoose.Types.ObjectId>
  forum: mongoose.Types.ObjectId
}

const roadmapSchema = new Schema({
  title: String,
  description: String,
  content: [{ type: Schema.Types.ObjectId, ref: 'Content' }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  enrolledUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  forum: { type: Schema.Types.ObjectId, ref: 'Forum' },
})

const Roadmap = mongoose.model<IRoadmap>('Roadmap', roadmapSchema)
export default Roadmap
