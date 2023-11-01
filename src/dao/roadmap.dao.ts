import Roadmap, { IRoadmap } from '../models/Roadmap'
import { createObjectId } from '../utils/common.utils'

class RoadmapDao {
  async findAllRoadmaps(): Promise<IRoadmap[]> {
    return await Roadmap.find()
  }

  async findRoadmapById(roadmapId: string): Promise<IRoadmap | null> {
    return await Roadmap.findById(roadmapId)
  }

  async createRoadmap(roadmapData: Partial<IRoadmap>): Promise<IRoadmap> {
    const roadmap = new Roadmap(roadmapData)
    return await roadmap.save()
  }

  async updateRoadmap(
    roadmapId: string,
    updateData: Partial<IRoadmap>,
  ): Promise<IRoadmap | null> {
    return await Roadmap.findByIdAndUpdate(roadmapId, updateData, { new: true })
  }

  async deleteRoadmap(roadmapId: string): Promise<void> {
    await Roadmap.findByIdAndDelete(roadmapId)
  }

  async enroll(roadmapId: string, userId: string): Promise<IRoadmap> {
    const updatedRoadmap = await Roadmap.findByIdAndUpdate(
      roadmapId,
      { $push: { enrolledUsers: createObjectId(userId) } },
      { new: true },
    )
    if (!updatedRoadmap) {
      throw new Error('Roadmap not found')
    }
    return updatedRoadmap
  }

  async unenroll(roadmapId: string, userId: string): Promise<IRoadmap> {
    const updatedRoadmap = await Roadmap.findByIdAndUpdate(
      roadmapId,
      { $pull: { enrolledUsers: createObjectId(userId) } },
      { new: true },
    )
    if (!updatedRoadmap) {
      throw new Error('Roadmap not found')
    }
    return updatedRoadmap
  }
}

export default new RoadmapDao()
