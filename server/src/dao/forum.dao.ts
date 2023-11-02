import Forum, { IForum } from '../models/Forum'

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
}

export default new ForumDao()