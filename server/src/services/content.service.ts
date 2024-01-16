import { IContent } from '../models/Content'
import ContentDao from '../dao/content.dao'
import { createObjectId } from '../utils/common.utils'
import RoadmapDao from '../dao/roadmap.dao'

class ContentService {
  async getContent(contentId: string): Promise<IContent | null> {
    return await ContentDao.findContentById(contentId)
  }

  async createContent(
    newContent: Partial<IContent>,
    userId: string,
    roadmapId: string,
  ): Promise<IContent> {
    try {
      const roadmap = await RoadmapDao.findRoadmapById(roadmapId)
      if (!roadmap) {
        throw new Error('Roadmap not found')
      }
      if (roadmap.creator.toString() !== userId) {
        throw new Error(
          'You are not authorized to create content for this roadmap',
        )
      }

      const content = {
        ...newContent,
        creator: createObjectId(userId),
        roadmap: createObjectId(roadmapId),
      }

      const createdContent = await ContentDao.createContent(content)
      await RoadmapDao.addContentToRoadmap(createdContent.id, roadmapId)
      return createdContent
    } catch (error) {
      console.error('Error creating content:', error)
      throw error
    }
  }

  async updateContent(
    contentId: string,
    updatedContent: Partial<IContent>,
    userId: string,
  ): Promise<IContent | null> {
    // check if the user is the creator of the roadmap
    const content = await ContentDao.findContentById(contentId)
    if (!content) {
      throw new Error('Content not found')
    }
    const roadmap = await RoadmapDao.findRoadmapById(content.roadmap.toString())
    if (!roadmap) {
      throw new Error('Roadmap not found')
    }
    if (roadmap.creator.toString() !== userId) {
      throw new Error('You are not authorized to update this content')
    }
    return await ContentDao.updateContent(contentId, updatedContent)
  }

  async deleteContent(
    contentId: string,
    userId: string,
  ): Promise<IContent | null> {
    // check if the user is the creator of the roadmap
    const content = await ContentDao.findContentById(contentId)
    if (!content) {
      throw new Error('Content not found')
    }
    const roadmap = await RoadmapDao.findRoadmapById(content.roadmap.toString())
    if (!roadmap) {
      throw new Error('Roadmap not found')
    }
    if (roadmap.creator.toString() !== userId) {
      throw new Error('You are not authorized to delete this content')
    }
    // delete the content and the contentId from the roadmap
    await RoadmapDao.deleteContentFromRoadmap(contentId, roadmap.id)
    return await ContentDao.deleteContent(contentId)
  }
}

export default new ContentService()
