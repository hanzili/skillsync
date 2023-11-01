import mongoose, { Document, Schema } from 'mongoose'

export interface IForum extends Document {
  roadmap: mongoose.Types.ObjectId
  threads: Array<mongoose.Types.ObjectId>
}

const forumSchema = new Schema({
  roadmap: { type: Schema.Types.ObjectId, ref: 'Roadmap' },
  threads: [{ type: Schema.Types.ObjectId, ref: 'Thread' }],
})

const Forum = mongoose.model<IForum>('Forum', forumSchema)
export default Forum
