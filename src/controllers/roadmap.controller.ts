import RoadmapService from '../services/roadmap.service'
import { Request, Response } from 'express'


class RoadmapController {
  async getRoadmaps(req: Request, res: Response) {
    try {
      const roadmaps = await RoadmapService.getRoadmaps()
      res.json(roadmaps)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async getRoadmap(req: Request, res: Response) {
    try {
      const roadmapId = req.params.id
      const roadmap = await RoadmapService.getRoadmap(roadmapId)
      res.json(roadmap)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async createRoadmap(req: Request, res: Response) {
    try {
      const userId = req.userId!
      const newRoadmap = await RoadmapService.createRoadmap(req.body, userId)
      res.json(newRoadmap)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async updateRoadmap(req: Request, res: Response) {
    try {
      const userId = req.userId!
      const updatedRoadmap = await RoadmapService.updateRoadmap(
        req.params.roadmapId,
        req.body,
        userId,
      )
      res.json(updatedRoadmap)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async deleteRoadmap(req: Request, res: Response) {
    try {
      const userId = req.userId!
      await RoadmapService.deleteRoadmap(req.params.roadmapId, userId)
      res.json({ message: 'Roadmap deleted successfully' })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export default new RoadmapController()
