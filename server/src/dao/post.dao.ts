import Post, { IPost } from '../models/Post'

class PostDao {
  async findPostById(postId: string): Promise<IPost | null> {
    return await Post.findById(postId)
  }

  async createPost(postData: Partial<IPost>): Promise<IPost> {
    const post = new Post(postData)
    return await post.save()
  }

  async updatePost(
    postId: string,
    content: Partial<IPost>,
  ): Promise<IPost | null> {
    return await Post.findByIdAndUpdate(postId, content, { new: true })
  }

  async deletePost(postId: string): Promise<IPost | null> {
    return await Post.findByIdAndDelete(postId)
  }
}

export default new PostDao()
