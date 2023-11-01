import { IRoadmap } from '../models/Roadmap'
import RoadmapDao from '../dao/roadmap.dao'
import mongoose from 'mongoose'

class RoadmapService {
  async getRoadmaps(): Promise<IRoadmap[]> {
    return await RoadmapDao.findAllRoadmaps()
  }

  async getRoadmap(roadmapId: string): Promise<IRoadmap | null> {
    return await RoadmapDao.findRoadmapById(roadmapId)
  }

  async createRoadmap(
    roadmapData: Partial<IRoadmap>,
    userId: string,
  ): Promise<IRoadmap> {
    const newRoadmap = {
      ...roadmapData,
      creator: new mongoose.Types.ObjectId(userId),
    }
    return await RoadmapDao.createRoadmap(newRoadmap)
  }

  async updateRoadmap(
    roadmapId: string,
    updateData: Partial<IRoadmap>,
    userId: string,
  ): Promise<IRoadmap | null> {
    const roadmap = await RoadmapDao.findRoadmapById(roadmapId)
    if (!roadmap) {
      throw new Error('Roadmap not found')
    }
    if (roadmap.creator.toString() !== userId) {
      throw new Error('Unauthorized')
    }
    return await RoadmapDao.updateRoadmap(roadmapId, updateData)
  }

  async deleteRoadmap(roadmapId: string, userId: string): Promise<void> {
    const roadmap = await RoadmapDao.findRoadmapById(roadmapId)
    if (!roadmap) {
      throw new Error('Roadmap not found')
    }
    if (roadmap.creator.toString() !== userId) {
      throw new Error('Unauthorized')
    }
    await RoadmapDao.deleteRoadmap(roadmapId)
  }
}

export default new RoadmapService()
