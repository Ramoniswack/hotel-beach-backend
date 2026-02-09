import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PageContent from '../models/Theme';

dotenv.config();

const explorePageContent = {
  pageName: 'explore',
  sections: [
    {
      sectionId: 'header',
      sectionName: 'Page Header',
      title: 'Explore Santorini',
      subtitle: 'Unwind the clock of modern life. Unlock the door to a wonder of the world.',
      description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse nihil, flexitarian Truffaut synth art party deep v chillwave. Seitan High Life reprehenderit consectetur cupidatat kogi. Et leggings fanny pack, elit bespoke vinyl art party Pitchfork selfies master cleanse Kickstarter seitan retro.',
      isVisible: true,
      order: 1
    },
    {
      sectionId: 'hero-image',
      sectionName: 'Hero Image',
      images: ['https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1920'],
      isVisible: true,
      order: 2
    },
    {
      sectionId: 'content',
      sectionName: 'Main Content',
      description: 'What to See and Do - Foam padding in the insoles leather finest quality staple flat slip-on design pointed toe off-duty shoe. Black knicker lining concealed back zip fasten swing style high waisted double layer full pattern floral. Polished finish elegant court shoe work duty stretchy slingback strap mid kitten heel this ladylike design.',
      isVisible: true,
      order: 3
    },
    {
      sectionId: 'image-gallery',
      sectionName: 'Image Gallery',
      items: [
        {
          image: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&q=80&w=1200',
          caption: 'City walk through the tunnel.',
          type: 'vertical'
        },
        {
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
          caption: 'Sea view of Santorini',
          type: 'horizontal'
        }
      ],
      isVisible: true,
      order: 4
    },
    {
      sectionId: 'closing-text',
      sectionName: 'Closing Text',
      description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse nihil, flexitarian Truffaut synth art party deep v chillwave.',
      isVisible: true,
      order: 5
    },
    {
      sectionId: 'our-rooms',
      sectionName: 'Our Rooms Section',
      title: 'Our Rooms',
      subtitle: 'Could also be interest for you',
      items: [
        {
          id: 'superior-room',
          title: 'Superior Room',
          image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=800',
          size: '30',
          maxAdults: '2',
          maxChildren: '1',
          price: '$199',
          link: '/accommodation/superior-room'
        },
        {
          id: 'deluxe-room',
          title: 'Deluxe Room',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
          size: '55',
          maxAdults: '3',
          maxChildren: '1',
          price: '$249',
          link: '/accommodation/deluxe-room'
        },
        {
          id: 'signature-room',
          title: 'Signature Room',
          image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
          size: '70',
          maxAdults: '3',
          maxChildren: '2',
          price: '$299',
          link: '/accommodation/signature-room'
        },
        {
          id: 'luxury-suite',
          title: 'Luxury Suite Room',
          image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800',
          size: '120',
          maxAdults: '4',
          maxChildren: '2',
          price: '$399',
          link: '/accommodation/luxury-suite'
        }
      ],
      isVisible: true,
      order: 6
    }
  ],
  metadata: {
    pageTitle: 'Explore Santorini - Beach Hotel',
    pageDescription: 'Discover the beauty of Santorini. Explore attractions, activities, and hidden gems of this stunning Greek island.',
    keywords: ['santorini', 'explore', 'attractions', 'activities', 'greece']
  }
};

async function seedExplorePageContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    await PageContent.deleteOne({ pageName: 'explore' });
    console.log('Cleared existing explore page content');

    const explorePage = new PageContent(explorePageContent);
    await explorePage.save();
    console.log('Explore page content seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding explore content:', error);
    process.exit(1);
  }
}

seedExplorePageContent();
