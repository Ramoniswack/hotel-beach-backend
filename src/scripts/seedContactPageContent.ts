import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PageContent from '../models/Theme';

dotenv.config();

const contactPageContent = {
  pageName: 'contact',
  sections: [
    {
      sectionId: 'header',
      sectionName: 'Page Header',
      title: 'Located in center of Santorini, Greece',
      subtitle: 'Unwind the clock of modern life. Unlock the door to a wonder of the world.',
      buttonText: 'Get Direction',
      buttonLink: 'https://maps.google.com',
      isVisible: true,
      order: 1
    },
    {
      sectionId: 'map',
      sectionName: 'Map Section',
      images: ['https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000'],
      isVisible: true,
      order: 2
    },
    {
      sectionId: 'info-columns',
      sectionName: 'Information Columns',
      items: [
        {
          title: 'Our Address',
          content: '45 Santorini Station. Thira 150-0042 Greece\nrevs@hotellerbeach.com'
        },
        {
          title: 'By Car',
          content: 'Approximately 5 minutes from Santorini station. or 10 minutes from Thira station.'
        },
        {
          title: 'By Train',
          content: '7 minutes walk from St. Santorini Station. or 15 minutes walk from Thira Station.'
        }
      ],
      isVisible: true,
      order: 3
    },
    {
      sectionId: 'contact-form',
      sectionName: 'Contact Form',
      title: 'Do you have any wishes or questions?',
      description: 'I consent to Hoteller Hotel collecting my details through this form.',
      isVisible: true,
      order: 4
    },
    {
      sectionId: 'contact-info',
      sectionName: 'Contact Information Card',
      title: 'Hoteller Beach Hotel',
      items: [
        {
          type: 'address',
          content: '45 Santorini Station\nThira 150-0042'
        },
        {
          type: 'contact',
          content: 'Tel.: +41 (0)54 2344 00\nFax: +41 (0)54 2344 99\nrevs@hotellerbeach.com'
        }
      ],
      isVisible: true,
      order: 5
    },
    {
      sectionId: 'social-media',
      sectionName: 'Social Media Links',
      title: 'Stay in touch with us',
      items: [
        {
          platform: 'facebook',
          url: '#',
          color: '#3b5998'
        },
        {
          platform: 'twitter',
          url: '#',
          color: '#52c179'
        },
        {
          platform: 'youtube',
          url: '#',
          color: '#e32d2d'
        },
        {
          platform: 'instagram',
          url: '#',
          color: '#35465d'
        }
      ],
      isVisible: true,
      order: 6
    }
  ],
  metadata: {
    pageTitle: 'Contact Us - Hoteller Beach Hotel',
    pageDescription: 'Get in touch with Hoteller Beach Hotel. Located in the center of Santorini, Greece. Contact us for reservations and inquiries.',
    keywords: ['contact', 'location', 'santorini', 'hotel', 'address', 'phone']
  }
};

async function seedContactPageContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    await PageContent.deleteOne({ pageName: 'contact' });
    console.log('Cleared existing contact page content');

    const contactPage = new PageContent(contactPageContent);
    await contactPage.save();
    console.log('Contact page content seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding contact content:', error);
    process.exit(1);
  }
}

seedContactPageContent();
