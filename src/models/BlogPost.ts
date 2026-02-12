import mongoose, { Document, Schema } from 'mongoose';

export interface IReply {
  userId?: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  comment: string;
  createdAt: Date;
}

export interface IComment {
  userId?: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  comment: string;
  likes: mongoose.Types.ObjectId[];
  replies: IReply[];
  createdAt: Date;
}

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  heroImage: string;
  categories: string[];
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  comments: IComment[];
  publishedAt: Date;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const ReplySchema = new Schema<IReply>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

const CommentSchema = new Schema<IComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String },
    comment: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    replies: [ReplySchema],
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    heroImage: { type: String, required: true },
    categories: [{ type: String }],
    tags: [{ type: String }],
    author: {
      name: { type: String, required: true },
      avatar: { type: String }
    },
    comments: [CommentSchema],
    publishedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' }
  },
  { timestamps: true }
);

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
