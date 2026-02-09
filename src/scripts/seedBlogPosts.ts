import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogPost from '../models/BlogPost';

dotenv.config();

const samplePosts = [
  {
    title: "Disclosing the Secrets of Success in Luxury Hospitality",
    slug: "secrets-luxury-hospitality",
    excerpt: "Every good day starts off with a cappuccino, and there's no place better to enjoy some frothy caffeine than at the Bulgari Hotel.",
    content: `Every good day starts off with a cappuccino, and there's no place better to enjoy some frothy caffeine than at the Bulgari Hotel.

Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse nihil, flexitarian Truffaut synth art party deep v chillwave. Seitan High Life reprehenderit consectetur cupidatat kogi. Et leggings fanny pack.

Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum. Aliquip veniam delectus, Marfa eiusmod Pinterest in do umami readymade swag. Selfies iPhone Kickstarter, drinking vinegar jean vinegar stumptown yr pop-up artisan.

See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing. Leather detail shoulder contrast colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped jacket. Effortless comfortable full leather lining eye-catching unique detail to the toe low 'cut-away' sides clean and sleek. Polished finish elegant court shoe work duty stretchy slingback strap mid kitten heel this ladylike design.`,
    heroImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000",
    categories: ["LUXURY", "TRAVEL", "VACATION"],
    tags: ["hotel", "luxury", "vacation"],
    author: {
      name: "Admin",
      avatar: ""
    },
    publishedAt: new Date("2024-06-14"),
    status: "published"
  },
  {
    title: "The Top Hotel Trends to Watch in 2024",
    slug: "hotel-trends-2024",
    excerpt: "Discover the latest trends shaping the luxury hotel industry and what guests can expect in the coming year.",
    content: `The hospitality industry is constantly evolving, and 2024 promises to bring exciting new trends that will redefine luxury travel experiences.

From sustainable practices to cutting-edge technology integration, hotels are adapting to meet the changing expectations of modern travelers. Personalization has become more than just a buzzword—it's now an essential component of the guest experience.

Wellness-focused amenities continue to gain prominence, with hotels investing in state-of-the-art spa facilities, meditation spaces, and healthy dining options. The integration of smart room technology allows guests to customize their environment with unprecedented ease.

Sustainability initiatives are no longer optional but expected, with eco-conscious travelers seeking accommodations that align with their values. From solar panels to zero-waste programs, hotels are embracing green practices while maintaining luxury standards.`,
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000",
    categories: ["INTERIOR DESIGN", "LUXURY", "VACATION"],
    tags: ["trends", "hotel", "luxury"],
    author: {
      name: "Admin",
      avatar: ""
    },
    publishedAt: new Date("2024-06-07"),
    status: "published"
  }
];

const seedBlogPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    await BlogPost.deleteMany({});
    console.log('Cleared existing blog posts');

    await BlogPost.insertMany(samplePosts);
    console.log('Sample blog posts seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    process.exit(1);
  }
};

seedBlogPosts();
