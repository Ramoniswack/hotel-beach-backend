import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PageContent from '../models/Theme';

dotenv.config();

const homePageContent = {
  pageName: 'home',
  sections: [
    {
      sectionId: 'hero',
      sectionName: 'Hero Section',
      title: 'Santorini Retreat',
      subtitle: 'Unlock the door to a wonder of the world',
      images: [
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1920',
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1920'
      ],
      items: [
        {
          title: 'Santorini Retreat',
          subtitle: 'Unlock the door to a wonder of the world',
          image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1920'
        },
        {
          title: 'Luxury Awaits',
          subtitle: 'Experience the pinnacle of Mediterranean hospitality',
          image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1920'
        }
      ],
      isVisible: true,
      order: 1
    },
    {
      sectionId: 'intro',
      sectionName: 'Introduction Section',
      title: 'Beach Hotel More than a stay',
      subtitle: 'About Hoteller',
      description: 'Pitchfork selfies master cleanse Kickstarter seitan retro. Drinking vinegar stumptown yr pop-up artisan sunt. Deep v cliche lomo biodiesel Neutra selfies. Shorts fixie consequat flexitarian four loko tempor duis single-origin coffee. Banksy, elit small batch freegan sed.',
      images: [
        'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80&w=1000'
      ],
      content: 'Richard Morgan - General Manager',
      isVisible: true,
      order: 2
    },
    {
      sectionId: 'deluxe-room',
      sectionName: 'Deluxe Room Section',
      title: 'Deluxe Room',
      subtitle: 'Luxury Redefined',
      description: 'Experience unparalleled comfort in our signature deluxe rooms',
      isVisible: true,
      order: 3
    },
    {
      sectionId: 'chef-experience',
      sectionName: 'Chef Experience Section',
      title: 'Experience Deliciously from Our Chefs',
      subtitle: '5 STARS MICHALIN',
      description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica.',
      images: [
        'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800'
      ],
      isVisible: true,
      order: 4
    },
    {
      sectionId: 'retreat-spa',
      sectionName: 'Retreat & Spa Section',
      title: 'Retreat & Spa',
      subtitle: 'Wellness Sanctuary',
      description: 'Rejuvenate your body and mind in our world-class spa facilities',
      images: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200'
      ],
      buttonText: 'Book Your Spa Day',
      buttonLink: '/spa',
      isVisible: true,
      order: 5
    },
    {
      sectionId: 'signature-designs',
      sectionName: 'Signature Designs Section',
      title: 'Signature Designs',
      subtitle: 'Architectural Excellence',
      description: 'Discover the unique blend of traditional Cycladic architecture and modern luxury',
      isVisible: true,
      order: 6
    },
    {
      sectionId: 'explore-santorini',
      sectionName: 'Explore Santorini Section',
      title: 'Explore Santorini',
      subtitle: 'Island Adventures',
      description: 'Discover the magic of Santorini with our curated experiences',
      buttonText: 'View Experiences',
      buttonLink: '/explore',
      isVisible: true,
      order: 7
    }
  ],
  metadata: {
    pageTitle: 'Beach Hotel - Luxury Santorini Resort',
    pageDescription: 'Experience the ultimate luxury retreat in Santorini. Discover our world-class accommodations, dining, and spa facilities.',
    keywords: ['santorini hotel', 'luxury resort', 'beach hotel', 'greece vacation']
  }
};

async function seedHomeContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    // Delete existing home page content
    await PageContent.deleteOne({ pageName: 'home' });
    console.log('Cleared existing home page content');

    // Create new home page content
    const homePage = new PageContent(homePageContent);
    await homePage.save();
    console.log('Home page content seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding home content:', error);
    process.exit(1);
  }
}

seedHomeContent();
