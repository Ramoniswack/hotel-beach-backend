import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const posts = await BlogPost.find(filter).sort({ publishedAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post', error });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    console.log('Creating post with data:', req.body);
    const post = new BlogPost(req.body);
    await post.save();
    console.log('Post created successfully:', post._id);
    res.status(201).json(post);
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ 
      message: 'Error creating blog post', 
      error: error.message,
      details: error.errors 
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post', error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post', error });
  }
};
