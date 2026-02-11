import mongoose, { Document, Schema } from 'mongoose';

export interface IPageContent extends Document {
  pageName: string;
  sections: {
    sectionId: string;
    sectionName: string;
    title?: string;
    subtitle?: string;
    description?: string;
    content?: string;
    heroImage?: string;
    images?: string[];
    buttonText?: string;
    buttonLink?: string;
    items?: any[];
    isVisible: boolean;
    order: number;
  }[];
  metadata: {
    pageTitle: string;
    pageDescription: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema: Schema = new Schema(
  {
    pageName: { 
      type: String, 
      required: true, 
      unique: true,
      enum: ['home', 'about', 'rooms', 'blog', 'explore', 'contact', 'site-settings', 'booking-settings']
    },
    sections: [{
      sectionId: { type: String, required: true },
      sectionName: { type: String, required: true },
      title: { type: String },
      subtitle: { type: String },
      description: { type: String },
      content: { type: String },
      heroImage: { type: String },
      images: [{ type: String }],
      buttonText: { type: String },
      buttonLink: { type: String },
      items: [{ type: Schema.Types.Mixed }],
      isVisible: { type: Boolean, default: true },
      order: { type: Number, default: 0 },
    }],
    metadata: {
      pageTitle: { type: String, required: true },
      pageDescription: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPageContent>('PageContent', PageContentSchema);
