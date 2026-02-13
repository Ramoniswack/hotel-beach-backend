import mongoose from 'mongoose';
import PageContent from '../models/Theme';
import dotenv from 'dotenv';

dotenv.config();

const seedPageLoader = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel');
    console.log('Connected to MongoDB');

    // Find site-settings page
    let siteSettings = await PageContent.findOne({ pageName: 'site-settings' });

    if (!siteSettings) {
      console.log('Site settings not found, creating...');
      siteSettings = new PageContent({
        pageName: 'site-settings',
        sections: [],
        metadata: {
          pageTitle: 'Site Settings',
          pageDescription: 'Global site configuration',
        },
      });
    }

    // Check if page-loader section already exists
    const loaderSectionIndex = siteSettings.sections.findIndex(
      (s: any) => s.sectionId === 'page-loader'
    );

    const loaderSection = {
      sectionId: 'page-loader',
      sectionName: 'Page Loader',
      title: 'HOTEL',
      subtitle: 'BEACH',
      isVisible: true,
      order: 3,
    };

    if (loaderSectionIndex >= 0) {
      // Update existing section
      siteSettings.sections[loaderSectionIndex] = loaderSection;
      console.log('Updated existing page-loader section');
    } else {
      // Add new section
      siteSettings.sections.push(loaderSection);
      console.log('Added new page-loader section');
    }

    await siteSettings.save();
    console.log('Page loader settings seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding page loader:', error);
    process.exit(1);
  }
};

seedPageLoader();
