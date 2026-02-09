import mongoose, { Document, Schema } from 'mongoose';

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
  publishedAt: Date;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

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
    publishedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' }
  },
  { timestamps: true }
);

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
