import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PageContent from '../models/Theme';

dotenv.config();

const siteSettings = {
  pageName: 'site-settings',
  sections: [
    {
      sectionId: 'header',
      sectionName: 'Header Settings',
      title: 'HOTEL BEACH',
      subtitle: 'Use text logo',
      images: [],
      items: [
        { label: 'Home', url: '/', order: 1 },
        { label: 'Our Rooms', url: '/rooms', order: 2 },
        { label: 'About Us', url: '/about', order: 3 },
        { label: 'Blog', url: '/blog', order: 4 },
        { label: 'Explore', url: '/explore', order: 5 },
        { label: 'Contact', url: '/contact', order: 6 }
      ],
      isVisible: true,
      order: 1
    },
    {
      sectionId: 'footer',
      sectionName: 'Footer Settings',
      items: [
        {
          section: 'address',
          title: 'OUR ADDRESS',
          content: 'Hoteller Beach Hotel\n45 Santorini Station\nThira 150-0042'
        },
        {
          section: 'reservation',
          title: 'RESERVATION',
          content: 'Tel.: +41 (0)54 2344 00\nFax: +41 (0)54 2344 99\nrevs@hotellerbeach.com'
        },
        {
          section: 'newsletter',
          title: 'NEWSLETTER',
          content: 'Subscribe to our newsletter'
        },
        {
          section: 'awards',
          title: 'AWARDS',
          images: [
            'https://hoteller-beach.themegoods.com/wp-content/uploads/2017/08/logo-tripadvisor.png',
            'https://hoteller-beach.themegoods.com/wp-content/uploads/2017/08/logo-asean.png'
          ]
        },
        {
          section: 'copyright',
          content: '© Copyright Hoteller Theme Demo - Theme by ThemeGoods'
        },
        {
          section: 'footer-links',
          links: [
            { label: 'Home', url: '/' },
            { label: 'Our Rooms', url: '/rooms' },
            { label: 'About Us', url: '/about' },
            { label: 'Contact', url: '/contact' },
            { label: 'Terms and Conditions', url: '#' }
          ]
        }
      ],
      isVisible: true,
      order: 2
    }
  ],
  metadata: {
    pageTitle: 'Site Settings',
    pageDescription: 'Global header and footer settings',
    keywords: ['header', 'footer', 'navigation', 'settings']
  }
};

async function seedSiteSettings() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    await PageContent.deleteOne({ pageName: 'site-settings' });
    console.log('Cleared existing site settings');

    const settings = new PageContent(siteSettings);
    await settings.save();
    console.log('Site settings seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding site settings:', error);
    process.exit(1);
  }
}

seedSiteSettings();
