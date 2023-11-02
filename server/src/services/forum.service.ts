import { IForum } from "../models/Forum";
import ForumDao from '../dao/forum.dao'
import { createObjectId } from '../utils/common.utils'

class ForumService {
    async getForum(forumId: string): Promise<IForum | null> {
        return await ForumDao.findForumById(forumId)
    }
}

export default new ForumService()