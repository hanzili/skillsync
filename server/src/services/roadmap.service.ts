import { IRoadmap } from '../models/Roadmap'
import RoadmapDao from '../dao/roadmap.dao'
import { createObjectId } from '../utils/common.utils'
import UserDao from '../dao/user.dao'
import ForumDao from '../dao/forum.dao'

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
    const newRoadmapContent = {
      ...roadmapData,
      creator: createObjectId(userId),
    }
    const newRoadmap = await RoadmapDao.createRoadmap(newRoadmapContent)
    // create a forum for this roadmap
    const newForum = await ForumDao.createForum({ roadmap: newRoadmap.id })
    // add forum id to roadmap
    await RoadmapDao.updateRoadmap(newRoadmap.id, { forum: newForum.id })
    return newRoadmap
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
    await ForumDao.deleteForum(roadmap.forum.toString())
    await RoadmapDao.deleteRoadmap(roadmapId)
  }

  async enroll(roadmapId: string, userId: string): Promise<IRoadmap> {
    const roadmap = await RoadmapDao.findRoadmapById(roadmapId)
    // check if roadmap exists
    if (!roadmap) {
      throw new Error('Roadmap not found')
    }
    // check if user is the creator
    if (roadmap.creator.toString() === userId) {
      throw new Error('You are the creator of this roadmap')
    }
    // check if user is already enrolled
    if (roadmap.enrolledUsers.includes(createObjectId(userId))) {
      throw new Error('You are already enrolled in this roadmap')
    }
    const updatedRoadmap = await RoadmapDao.enroll(roadmapId, userId)
    return updatedRoadmap
  }

  async unenroll(roadmapId: string, userId: string): Promise<IRoadmap> {
    const roadmap = await RoadmapDao.findRoadmapById(roadmapId)
    if (!roadmap) {
      throw new Error('Roadmap not found')
    }
    if (roadmap.creator.toString() === userId) {
      throw new Error('You are the creator of this roadmap')
    }
    if (!roadmap.enrolledUsers.includes(createObjectId(userId))) {
      throw new Error('You are not enrolled in this roadmap')
    }
    const updatedRoadmap = await RoadmapDao.unenroll(roadmapId, userId)
    return updatedRoadmap
  }

  async unenrollAllUsers(roadmapId: string): Promise<void> {
    const users = await UserDao.findUsersByEnrolledRoadmap(roadmapId)
    for (const user of users) {
      await UserDao.unenroll(roadmapId, user.id)
    }
  }
}

export default new RoadmapService()
