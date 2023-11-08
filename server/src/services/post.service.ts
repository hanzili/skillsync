import mongoose from 'mongoose'
import { IPost } from '../models/Post'
import PostDao from '../dao/post.dao'
import { createObjectId } from '../utils/common.utils'
import ThreadDao from '../dao/thread.dao'
import UserDao from '../dao/user.dao'
import ForumDao from '../dao/forum.dao'

class PostService {
  async getPost(postId: string): Promise<IPost | null> {
    return await PostDao.findPostById(postId)
  }

  async createPost(
    userId: string,
    threadId: string,
    content: Partial<IPost>,
  ): Promise<IPost> {
    await this.checkThreadPostingPermission(threadId, userId)
    const newPostContent = {
      creator: createObjectId(userId),
      thread: createObjectId(threadId),
      content,
    }
    // add post to thread
    const newPost = await PostDao.createPost(newPostContent)
    await ThreadDao.addPostToThread(threadId, newPost.id)
    return newPost
  }

  async updatePost(
    postId: string,
    userId: string,
    content: Partial<IPost>,
  ): Promise<IPost | null> {
    await this.checkPostPermission(postId, userId)
    return await PostDao.updatePost(postId, content)
  }

  async deletePost(postId: string, userId: string): Promise<IPost | null> {
    await this.checkPostPermission(postId, userId)
    const deletedPost = await PostDao.deletePost(postId)
    // remove post from thread
    if (deletedPost) {
      await ThreadDao.deletePostFromThread(
        deletedPost.thread.toString(),
        postId,
      )
    }
    return deletedPost
  }

  async checkPostPermission(postId: string, userId: string): Promise<boolean> {
    console.log(postId, userId)
    const post = await PostDao.findPostById(postId)
    if (!post) {
      throw new Error('Post not found')
    }
    if (post.creator.toString() !== userId) {
      throw new Error('Unauthorized')
    }
    return true
  }

  async checkThreadPostingPermission(
    threadId: string,
    userId: string,
  ): Promise<boolean> {
    const thread = await ThreadDao.findThreadById(threadId)
    if (!thread) {
      throw new Error('Thread not found')
    }
    const user = await UserDao.findUserById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    const forum = await ForumDao.findForumById(thread.forum.toString())
    if (!forum) {
      throw new Error('Forum not found')
    }
    if (
      !user.enrolledRoadmaps.includes(
        createObjectId(
          forum.roadmap.toString(),
        ) as unknown as mongoose.Schema.Types.ObjectId,
      )
    ) {
      throw new Error('Unauthorized')
    }
    return true
  }
}

export default new PostService()
