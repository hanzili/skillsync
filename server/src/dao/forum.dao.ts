import Forum, { IForum } from '../models/Forum'
import { createObjectId } from '../utils/common.utils'

class ForumDao {
  async findForumById(forumId: string): Promise<IForum | null> {
    return await Forum.findById(forumId)
  }

  async createForum(forumData: Partial<IForum>): Promise<IForum> {
    const newForum = new Forum(forumData)
    return await newForum.save()
  }

  async deleteForum(forumId: string): Promise<void> {
    await Forum.findByIdAndDelete(forumId)
  }

  async addThreadToForum(forumId: string, threadId: string): Promise<void> {
    await Forum.findByIdAndUpdate(forumId, {
      $push: { threads: createObjectId(threadId) },
    })
  }

  async removeThreadFromForum(
    forumId: string,
    threadId: string,
  ): Promise<void> {
    await Forum.findByIdAndUpdate(forumId, {
      $pull: { threads: createObjectId(threadId) },
    })
  }
}

export default new ForumDao()
