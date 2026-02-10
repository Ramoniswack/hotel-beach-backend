import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PageContent from '../models/Theme';

dotenv.config();

const roomsPageContent = {
  pageName: 'rooms',
  sections: [
    {
      sectionId: 'retreat-hero',
      sectionName: 'Retreat Hero Section',
      title: 'Retreat Hotel at Santorini',
      subtitle: 'Unwind the clock of modern life. Unlock the door to a wonder of the world.',
      heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop',
      isVisible: true,
      order: 1
    },
    {
      sectionId: 'header',
      sectionName: 'Page Header',
      title: 'In harmony with nature',
      description: 'Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum.',
      isVisible: true,
      order: 2
    },
    {
      sectionId: 'rooms-showcase',
      sectionName: 'Rooms Showcase',
      title: 'Our Rooms',
      description: 'Browse our collection of luxury accommodations',
      isVisible: true,
      order: 3
    },
    {
      sectionId: 'spa-section',
      sectionName: 'Spa Section',
      title: 'Spa & Wellness',
      description: 'Rejuvenate your body and mind',
      isVisible: true,
      order: 4
    },
    {
      sectionId: 'promotions',
      sectionName: 'Promotions Grid',
      title: 'Special Offers',
      description: 'Check out our exclusive packages',
      items: [
        {
          title: '2 Nights Getaway Promotion Package',
          image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800',
          link: '/promotions/getaway'
        },
        {
          title: 'Free Breakfast for 3 days Package',
          image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&q=80&w=800',
          link: '/promotions/breakfast'
        },
        {
          title: '3 Nights Honeymoon Special Package',
          image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800',
          link: '/promotions/honeymoon'
        }
      ],
      isVisible: true,
      order: 5
    }
  ],
  metadata: {
    pageTitle: 'Our Rooms - Beach Hotel Santorini',
    pageDescription: 'Discover our luxury accommodations in Santorini. From deluxe rooms to premium suites, find your perfect stay.',
    keywords: ['hotel rooms', 'santorini accommodation', 'luxury suites', 'beach hotel rooms']
  }
};

async function seedRoomsPageContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    // Delete existing rooms page content
    await PageContent.deleteOne({ pageName: 'rooms' });
    console.log('Cleared existing rooms page content');

    // Create new rooms page content
    const roomsPage = new PageContent(roomsPageContent);
    await roomsPage.save();
    console.log('Rooms page content seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding rooms content:', error);
    process.exit(1);
  }
}

seedRoomsPageContent();
