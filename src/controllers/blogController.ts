import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';
import { AuthRequest } from '../middleware/auth';

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

export const addComment = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const { name, email, comment } = req.body;
    
    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // If user is authenticated, use their info
    const commentData: any = {
      comment,
      createdAt: new Date(),
      likes: [],
      replies: []
    };

    if (authReq.user) {
      commentData.userId = authReq.user.id;
      commentData.name = authReq.user.name || name;
      commentData.email = authReq.user.email;
    } else {
      if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required for guest comments' });
      }
      commentData.name = name;
      commentData.email = email;
    }

    post.comments.push(commentData);
    await post.save();
    
    res.status(201).json({ message: 'Comment added successfully', comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

export const likeComment = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    if (!authReq.user) {
      return res.status(401).json({ message: 'Authentication required to like comments' });
    }

    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = (post.comments as any).id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const userIdStr = authReq.user.id;
    const likeIndex = comment.likes.findIndex((id: any) => id.toString() === userIdStr);

    if (likeIndex > -1) {
      // Unlike
      comment.likes.splice(likeIndex, 1);
    } else {
      // Like
      comment.likes.push(userIdStr as any);
    }

    await post.save();
    res.json({ message: 'Like toggled successfully', likes: comment.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment', error });
  }
};

export const addReply = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const { name, email, comment } = req.body;
    
    if (!comment) {
      return res.status(400).json({ message: 'Reply is required' });
    }

    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const parentComment = (post.comments as any).id(req.params.commentId);
    if (!parentComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const replyData: any = {
      comment,
      createdAt: new Date()
    };

    if (authReq.user) {
      replyData.userId = authReq.user.id;
      replyData.name = authReq.user.name || name;
      replyData.email = authReq.user.email;
    } else {
      if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required for guest replies' });
      }
      replyData.name = name;
      replyData.email = email;
    }

    parentComment.replies.push(replyData);
    await post.save();
    
    res.status(201).json({ message: 'Reply added successfully', replies: parentComment.replies });
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply', error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = (post.comments as any).id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.deleteOne();
    await post.save();
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};

export const deleteReply = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = (post.comments as any).id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const reply = (comment.replies as any).id(req.params.replyId);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    reply.deleteOne();
    await post.save();
    
    res.json({ message: 'Reply deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reply', error });
  }
};
