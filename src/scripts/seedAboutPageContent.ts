import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PageContent from '../models/Theme';

dotenv.config();

const aboutPageContent = {
  pageName: 'about',
  sections: [
    {
      sectionId: 'header',
      sectionName: 'Page Header',
      title: 'Retreat Hotel at Santorini',
      subtitle: 'Unwind the clock of modern life. Unlock the door to a wonder of the world.',
      isVisible: true,
      order: 1
    },
    {
      sectionId: 'hero-image',
      sectionName: 'Hero Image',
      images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=2000'],
      isVisible: true,
      order: 2
    },
    {
      sectionId: 'intro-text',
      sectionName: 'Introduction Text',
      description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse nihil, flexitarian Truffaut synth art party deep v chillwave. Seitan High Life reprehenderit consectetur cupidatat kogi. Et leggings fanny pack.',
      content: 'RICARD MORGAN - GENERAL MANAGER',
      isVisible: true,
      order: 3
    },
    {
      sectionId: 'gallery',
      sectionName: 'Photo Gallery',
      images: [
        'https://images.unsplash.com/photo-1433086177604-50dc80846517?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&q=80&w=600'
      ],
      isVisible: true,
      order: 4
    },
    {
      sectionId: 'content-section',
      sectionName: 'Content Section',
      title: 'Everything Handy',
      items: [
        {
          text: 'Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum. Aliquip veniam delectus, Marfa eiusmod Pinterest in do umami readymade swag. Selfies iPhone Kickstarter, drinking vinegar jean vinegar stumptown yr pop-up artisan.'
        },
        {
          text: 'See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing. Leather detail shoulder contrast colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped jacket.'
        },
        {
          text: 'Effortless comfortable full leather lining eye-catching unique detail to the toe low \'cut-away\' sides clean and sleek. Polished finish elegant court shoe work duty stretchy slingback strap mid kitten heel this ladylike design slingback strap mid kitten heel this ladylike design.'
        }
      ],
      isVisible: true,
      order: 5
    },
    {
      sectionId: 'banner-image',
      sectionName: 'Banner Image',
      images: ['https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=2000'],
      isVisible: true,
      order: 6
    }
  ],
  metadata: {
    pageTitle: 'About Us - Beach Hotel Santorini',
    pageDescription: 'Discover the story behind our luxury retreat in Santorini. Experience Mediterranean hospitality at its finest.',
    keywords: ['about us', 'santorini hotel', 'luxury retreat', 'hotel story']
  }
};

async function seedAboutPageContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    // Delete existing about page content
    await PageContent.deleteOne({ pageName: 'about' });
    console.log('Cleared existing about page content');

    // Create new about page content
    const aboutPage = new PageContent(aboutPageContent);
    await aboutPage.save();
    console.log('About page content seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding about content:', error);
    process.exit(1);
  }
}

seedAboutPageContent();
