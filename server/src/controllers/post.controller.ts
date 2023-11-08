import PostService from '../services/post.service'
import { Request, Response } from 'express'
import { CustomRequest } from '../types/custom'

class PostController {
  async getPost(req: Request, res: Response) {
    try {
      const postId = req.params.postId
      const post = await PostService.getPost(postId)
      res.json(post)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async createPost(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      const threadId = req.params.threadId
      const post = await PostService.createPost(userId, threadId, req.body)
      res.json(post)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async updatePost(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      const postId = req.params.postId
      const post = await PostService.updatePost(postId, userId, req.body)
      res.json(post)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  async deletePost(req: CustomRequest, res: Response) {
    try {
      const userId = req.userId!
      const postId = req.params.postId
      const post = await PostService.deletePost(postId, userId)
      res.json(post)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export default new PostController()
