import Thread, { IThread } from '../models/Thread'

class ThreadDao {
  async createThread(threadContent: Partial<IThread>): Promise<IThread> {
    const thread = new Thread(threadContent)
    await thread.save()
    return thread
  }

  async findThreadById(threadId: string): Promise<IThread | null> {
    return Thread.findById(threadId)
  }

  async updateThread(
    threadId: string,
    updateFields: Partial<IThread>,
  ): Promise<IThread | null> {
    const updatedThread = await Thread.findByIdAndUpdate(
      threadId,
      updateFields,
      {
        new: true,
      },
    )
    return updatedThread
  }

  async deleteThread(threadId: string): Promise<IThread | null> {
    const deletedThread = await Thread.findByIdAndDelete(threadId)
    return deletedThread
  }

  async addPostToThread(threadId: string, postId: string): Promise<void> {
    await Thread.findByIdAndUpdate(threadId, {
      $push: { posts: postId },
    })
  }

  async deletePostFromThread(threadId: string, postId: string): Promise<void> {
    await Thread.findByIdAndUpdate(threadId, {
      $pull: { posts: postId },
    })
  }
}

export default new ThreadDao()
