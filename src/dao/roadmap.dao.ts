import Roadmap, { IRoadmap } from '../models/Roadmap'

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
}

export default new RoadmapDao()
