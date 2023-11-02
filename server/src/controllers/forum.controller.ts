import ForumService from '../services/forum.service'
import { Request, Response } from 'express'
import { CustomRequest } from '../types/custom'

class ForumController {
    async getForum(req: Request, res: Response) {
        try {
            const forumId = req.params.forumId
            const forum = await ForumService.getForum(forumId)
            res.json(forum)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default new ForumController()