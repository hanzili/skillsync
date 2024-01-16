import mongoose from 'mongoose'
import { IThread } from '../models/Thread'
import ThreadDao from '../dao/thread.dao'
import { createObjectId } from '../utils/common.utils'
import ForumDao from '../dao/forum.dao'
import UserDao from '../dao/user.dao'

class ThreadService {
  async getThread(threadId: string): Promise<IThread | null> {
    return await ThreadDao.findThreadById(threadId)
  }

  async createThread(
    forumId: string,
    userId: string,
    title: string,
  ): Promise<IThread> {
    // check if the user can create thread in this forum
    const forum = await ForumDao.findForumById(forumId)
    if (!forum) {
      throw new Error('Forum not found')
    }
    const user = await UserDao.findUserById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    if (
      !user.enrolledRoadmaps.includes(
        createObjectId(
          forum.roadmap.toString(),
        ) as unknown as mongoose.Schema.Types.ObjectId,
      )
    ) {
      throw new Error('Unauthorized')
    }
    const newThreadContent = {
      title,
      creator: createObjectId(userId),
      forum: createObjectId(forumId),
    }
    const newThread = await ThreadDao.createThread(newThreadContent)
    // add thread to forum
    await ForumDao.addThreadToForum(forumId, newThread.id)
    return newThread
  }

  async updateThread(
    threadId: string,
    userId: string,
    title: string,
  ): Promise<IThread | null> {
    const thread = await ThreadDao.findThreadById(threadId)
    if (!thread) {
      throw new Error('Thread not found')
    }
    if (thread.creator.toString() !== userId) {
      throw new Error('Unauthorized')
    }
    return await ThreadDao.updateThread(threadId, { title })
  }

  async deleteThread(threadId: string, userId: string): Promise<void> {
    const thread = await ThreadDao.findThreadById(threadId)
    if (!thread) {
      throw new Error('Thread not found')
    }
    if (thread.creator.toString() !== userId) {
      throw new Error('Unauthorized')
    }
    await ThreadDao.deleteThread(threadId)
    await ForumDao.removeThreadFromForum(thread.forum.toString(), threadId)
  }
}

export default new ThreadService()
