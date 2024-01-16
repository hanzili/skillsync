import Content, { IContent } from '../models/Content'

class RoadmapDao {
  async findContentById(contentId: string): Promise<IContent | null> {
    return await Content.findById(contentId)
  }

  async createContent(newContent: Partial<IContent>): Promise<IContent> {
    const content = new Content(newContent)
    return await content.save()
  }

  async updateContent(
    contentId: string,
    updateContent: Partial<IContent>,
  ): Promise<IContent | null> {
    return await Content.findByIdAndUpdate(contentId, updateContent, {
      new: true,
    })
  }

  async deleteContent(contentId: string): Promise<IContent | null> {
    return await Content.findByIdAndDelete(contentId)
  }
}
export default new RoadmapDao()
