import ContentService from '../services/content.service'
import { Request, Response } from 'express'
import { CustomRequest } from '../types/custom'

class ContentController {
  async getContent(req: Request, res: Response) {
    try {
      const contentId = req.params.contentId
      const content = await ContentService.getContent(contentId)
      res.json(content)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async createContent(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      const roadmapId = req.params.roadmapId
      const newContent = await ContentService.createContent(
        req.body,
        userId,
        roadmapId,
      )
      res.json(newContent)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async updateContent(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      const updatedContent = await ContentService.updateContent(
        req.params.contentId,
        req.body,
        userId,
      )
      res.json(updatedContent)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async deleteContent(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      await ContentService.deleteContent(req.params.contentId, userId)
      res.json({ message: 'Content deleted successfully' })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export default new ContentController()
