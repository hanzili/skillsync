import RoadmapService from '../services/roadmap.service'
import { Request, Response } from 'express'
import { CustomRequest } from '../types/custom'
import UserService from '../services/user.service'

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

  async createRoadmap(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      const newRoadmap = await RoadmapService.createRoadmap(req.body, userId)
      await UserService.addCreatedRoadmap(userId, newRoadmap.id)
      res.json(newRoadmap)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async updateRoadmap(req: CustomRequest, res: Response) {
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

  async deleteRoadmap(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      await RoadmapService.deleteRoadmap(req.params.roadmapId, userId)
      await UserService.deleteCreatedRoadmap(userId, req.params.roadmapId)
      res.json({ message: 'Roadmap deleted successfully' })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export default new RoadmapController()
