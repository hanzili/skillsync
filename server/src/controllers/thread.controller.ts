import { Request, Response } from 'express'
import ThreadService from '../services/thread.service'
import { CustomRequest } from '../types/custom'

class ThreadController {
  async getThread(req: Request, res: Response) {
    try {
      const threadId = req.params.threadId
      const thread = await ThreadService.getThread(threadId)
      res.json(thread)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async createThread(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      const forumId = req.params.forumId
      const { title } = req.body
      const thread = await ThreadService.createThread(forumId, userId, title)
      res.status(201).json(thread)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async updateThread(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      const threadId = req.params.threadId
      const { title } = req.body
      const thread = await ThreadService.updateThread(threadId, userId, title)
      res.json(thread)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async deleteThread(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      const threadId = req.params.threadId
      const thread = await ThreadService.deleteThread(threadId, userId)
      res.json(thread)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export default new ThreadController()
