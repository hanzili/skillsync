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
}

export default new ThreadDao()
