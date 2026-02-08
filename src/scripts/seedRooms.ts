import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from '../models/Room';

dotenv.config();

const rooms = [
  {
    id: 'superior-room',
    title: 'Superior Room',
    subtitle: 'Great for business trip',
    price: 199,
    heroImage: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1920',
    description: [
      'Great choice for a relaxing vacation for families with children or a group of friends.',
      'Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum.',
      'See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing. Leather detail shoulder contrast colour contour stunning silhouette working peplum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel molestie nisl. Duis ac mi leo. Mauris at convallis erat.'
    ],
    specs: {
      bed: 'Twins Bed',
      capacity: '2 Adults 1 Children',
      size: '30m²',
      view: 'Sea view'
    },
    gallery: [
      'https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591088398332-8a77d399eb65?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&q=80&w=800'
    ],
    amenities: [
      '40-inch Samsung® LED TV',
      'Electronic safe with charging facility',
      'iHome™ Bluetooth MP3 Player',
      'Iron and ironing board',
      'Mini bar',
      'Non-smoking',
      'USB charging station',
      'Wired and wireless broadband Internet access',
      'Work desk'
    ],
    services: [
      'Free-to-use smartphone (Free)',
      'Safe-deposit box (Free)',
      'Luggage storage (Free)',
      'Childcare ($60 / Once / Per Accommodation)',
      'Massage ($15 / Once / Per Guest)'
    ],
    isAvailable: true
  },
  {
    id: 'deluxe-room',
    title: 'Deluxe Room',
    subtitle: 'Great for business trip',
    price: 249,
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1920',
    description: [
      'Great choice for a relaxing vacation for families with children or a group of friends.',
      'Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum.',
      'See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing. Leather detail shoulder contrast colour contour stunning silhouette working peplum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel molestie nisl. Duis ac mi leo. Mauris at convallis erat.'
    ],
    specs: {
      bed: 'King Bed',
      capacity: '3 Adults 1 Children',
      size: '55m²',
      view: 'Sea view'
    },
    gallery: [
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800'
    ],
    amenities: [
      '40-inch Samsung® LED TV',
      'Electronic safe with charging facility',
      'iHome™ Bluetooth MP3 Player',
      'Iron and ironing board',
      'Mini bar',
      'Non-smoking',
      'USB charging station',
      'Wired and wireless broadband Internet access',
      'Work desk'
    ],
    services: [
      'Free-to-use smartphone (Free)',
      'Safe-deposit box (Free)',
      'Luggage storage (Free)',
      'Childcare ($60 / Once / Per Accommodation)',
      'Massage ($15 / Once / Per Guest)'
    ],
    isAvailable: true
  },
  {
    id: 'signature-room',
    title: 'Signature Room',
    subtitle: 'Great for families',
    price: 299,
    heroImage: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1920',
    description: [
      'Great choice for a relaxing vacation for families with children or a group of friends.',
      'Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum.',
      'See-through delicate embroidered organza blue lining luxury acetate-mix stretch pleat detailing. Leather detail shoulder contrast colour contour stunning silhouette working peplum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel molestie nisl. Duis ac mi leo. Mauris at convallis erat.'
    ],
    specs: {
      bed: 'King Bed',
      capacity: '3 Adults 2 Children',
      size: '70m²',
      view: 'Sea view'
    },
    gallery: [
      'https://images.unsplash.com/photo-1590073236110-33c0afd3db2f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: [
      '40-inch Samsung® LED TV',
      'Electronic safe with charging facility',
      'iHome™ Bluetooth MP3 Player',
      'Iron and ironing board',
      'Mini bar',
      'Non-smoking',
      'USB charging station',
      'Wired and wireless broadband Internet access',
      'Work desk'
    ],
    services: [
      'Free-to-use smartphone (Free)',
      'Safe-deposit box (Free)',
      'Luggage storage (Free)',
      'Childcare ($60 / Once / Per Accommodation)',
      'Massage ($15 / Once / Per Guest)'
    ],
    isAvailable: true
  }
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing rooms
    await Room.deleteMany({});
    console.log('Cleared existing rooms');

    // Insert new rooms
    await Room.insertMany(rooms);
    console.log('Rooms seeded successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
