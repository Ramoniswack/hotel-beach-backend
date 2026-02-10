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
    author: { name: "Admin", avatar: "" },
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
    author: { name: "Admin", avatar: "" },
    publishedAt: new Date("2024-06-07"),
    status: "published"
  },
  {
    title: "Online Hotel Marketing - A Hotelier's Guide",
    slug: "online-hotel-marketing-guide",
    excerpt: "Master the art of digital marketing to attract more guests and increase your hotel's online presence.",
    content: `In today's digital age, effective online marketing is crucial for hotel success. Understanding how to leverage various digital channels can significantly impact your booking rates and brand visibility.

Social media platforms offer unprecedented opportunities to showcase your property and engage with potential guests. Instagram, in particular, has become a powerful tool for visual storytelling in the hospitality industry.

Search engine optimization (SEO) ensures your hotel appears when travelers search for accommodations in your area. Investing in quality content and local SEO strategies can dramatically improve your online visibility.

Email marketing remains one of the most effective channels for nurturing guest relationships and encouraging repeat bookings. Personalized campaigns based on guest preferences and booking history yield the best results.`,
    heroImage: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=2000",
    categories: ["INTERIOR DESIGN", "LUXURY", "VACATION"],
    tags: ["marketing", "digital", "hotel"],
    author: { name: "Admin", avatar: "" },
    publishedAt: new Date("2024-06-05"),
    status: "published"
  },
  {
    title: "Luxury Amenities That Guests Want Most",
    slug: "luxury-amenities-guests-want",
    excerpt: "Discover which hotel amenities modern luxury travelers value most and how to exceed their expectations.",
    content: `Today's luxury travelers have evolved expectations. While traditional amenities remain important, new preferences are emerging that hotels must address to stay competitive.

High-speed WiFi is no longer a luxury—it's a necessity. Guests expect seamless connectivity throughout the property, from rooms to poolside areas. Many hotels are now offering fiber-optic connections to meet these demands.

Wellness facilities have become a top priority. State-of-the-art fitness centers, yoga studios, and spa services are essential for attracting health-conscious travelers who don't want to compromise their routines while traveling.

Sustainable practices resonate strongly with modern guests. From organic toiletries to energy-efficient systems, eco-friendly initiatives are increasingly influencing booking decisions among luxury travelers.`,
    heroImage: "https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&q=80&w=2000",
    categories: ["INTERIOR DESIGN", "LUXURY", "TRAVEL"],
    tags: ["amenities", "luxury", "guests"],
    author: { name: "Admin", avatar: "" },
    publishedAt: new Date("2024-06-03"),
    status: "published"
  },
  {
    title: "How Independent Hotels Win Direct Bookings",
    slug: "independent-hotels-direct-bookings",
    excerpt: "Learn strategies to reduce OTA dependency and increase direct bookings for your independent hotel.",
    content: `Independent hotels face unique challenges competing with major chains and online travel agencies. However, with the right strategies, they can successfully drive direct bookings and build loyal guest relationships.

A user-friendly booking engine on your website is essential. Guests should be able to check availability, compare room types, and complete reservations seamlessly without leaving your site.

Offering exclusive perks for direct bookings incentivizes guests to book through your website rather than third-party platforms. These can include room upgrades, late checkout, or complimentary amenities.

Building a strong brand identity helps differentiate your property. Showcase what makes your hotel unique—whether it's exceptional service, local experiences, or distinctive design—to attract guests who value authenticity.`,
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000",
    categories: ["LUXURY", "TRAVEL", "VACATION"],
    tags: ["bookings", "strategy", "independent"],
    author: { name: "Admin", avatar: "" },
    publishedAt: new Date("2024-06-01"),
    status: "published"
  },
  {
    title: "10 Ways to Market Your Hotel for Summer",
    slug: "market-hotel-summer-season",
    excerpt: "Maximize your summer bookings with these proven marketing strategies for the peak travel season.",
    content: `Summer is the peak season for many hotels, and effective marketing can make the difference between a good season and a great one. Here are proven strategies to boost your summer bookings.

Start your marketing campaigns early. Travelers often plan summer vacations months in advance, so begin promoting your summer packages and special offers in early spring.

Create compelling summer packages that bundle accommodations with local experiences. Beach activities, outdoor adventures, and family-friendly programs can add significant value to your offerings.

Leverage social media to showcase your property's summer appeal. Share photos of your pool, outdoor dining areas, and nearby attractions to inspire potential guests.

Partner with local businesses to create unique experiences. Collaborations with restaurants, tour operators, and activity providers can enhance your guests' stay while supporting the local community.`,
    heroImage: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=2000",
    categories: ["LUXURY", "TRAVEL", "VACATION"],
    tags: ["marketing", "summer", "season"],
    author: { name: "Admin", avatar: "" },
    publishedAt: new Date("2024-05-28"),
    status: "published"
  },
  {
    title: "Hotel Star Categories Around the World",
    slug: "hotel-star-categories-worldwide",
    excerpt: "Understanding how hotel star ratings differ across countries and what they mean for travelers.",
    content: `Hotel star ratings can be confusing for international travelers, as different countries use varying criteria to classify properties. Understanding these differences helps set appropriate expectations.

In Europe, star ratings are often government-regulated and based on specific amenities and services. A 4-star hotel in Germany, for example, must meet strict criteria regarding room size, facilities, and service standards.

The United States uses a more flexible system, with multiple rating organizations applying different standards. This can lead to inconsistencies, making it important to read reviews and descriptions beyond just the star rating.

Asian countries often have their own unique rating systems. In some markets, luxury properties may not participate in official rating systems, instead relying on brand reputation and guest reviews.

Understanding these variations helps travelers make informed decisions and hotels position themselves appropriately in different markets.`,
    heroImage: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&q=80&w=2000",
    categories: ["INTERIOR DESIGN", "TRAVEL", "VACATION"],
    tags: ["ratings", "standards", "international"],
    author: { name: "Admin", avatar: "" },
    publishedAt: new Date("2024-05-25"),
    status: "published"
  },
  {
    title: "Creating Memorable Guest Experiences",
    slug: "memorable-guest-experiences",
    excerpt: "Go beyond expectations to create unforgettable moments that turn guests into loyal advocates.",
    content: `In the competitive hospitality industry, creating memorable experiences is what sets exceptional hotels apart. It's not just about providing a place to sleep—it's about crafting moments that guests will remember long after checkout.

Personalization is key. Use guest data to anticipate needs and preferences. Remembering a returning guest's favorite room type or dietary restrictions shows attention to detail that guests appreciate.

Surprise and delight moments create lasting impressions. Unexpected amenities, complimentary upgrades, or personalized welcome notes can transform a standard stay into something special.

Empower your staff to make decisions that enhance guest satisfaction. When team members have the authority to resolve issues or create special moments without bureaucratic approval, service becomes more genuine and responsive.

Local experiences add authentic value. Curate recommendations for hidden gems, arrange unique activities, or partner with local artisans to offer guests insider access to your destination.`,
    heroImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=2000",
    categories: ["LUXURY", "TRAVEL", "VACATION"],
    tags: ["experience", "service", "hospitality"],
    author: { name: "Admin", avatar: "" },
    publishedAt: new Date("2024-05-22"),
    status: "published"
  },
  {
    title: "Sustainable Luxury: The Future of Hotels",
    slug: "sustainable-luxury-hotels",
    excerpt: "How luxury hotels are embracing sustainability without compromising on guest experience.",
    content: `Sustainability and luxury are no longer mutually exclusive. Modern luxury hotels are proving that environmental responsibility can enhance rather than diminish the guest experience.

Energy efficiency goes beyond cost savings. Smart building systems, LED lighting, and renewable energy sources reduce environmental impact while maintaining comfort. Many guests appreciate knowing their stay supports sustainable practices.

Water conservation initiatives are becoming standard. Low-flow fixtures, linen reuse programs, and greywater recycling systems significantly reduce water consumption without affecting guest comfort.

Local sourcing benefits both the environment and the community. Farm-to-table dining programs, locally-made amenities, and partnerships with regional suppliers reduce carbon footprint while supporting local economies.

Waste reduction programs are essential. Composting, recycling, and eliminating single-use plastics demonstrate commitment to sustainability. Many luxury hotels are achieving zero-waste goals through innovative programs.`,
    heroImage: "https://images.unsplash.com/photo-1469796466635-455ede028ace?auto=format&fit=crop&q=80&w=2000",
    categories: ["INTERIOR DESIGN", "LUXURY", "VACATION"],
    tags: ["sustainability", "eco-friendly", "green"],
    author: { name: "Admin", avatar: "" },
    publishedAt: new Date("2024-05-20"),
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
    console.log(`${samplePosts.length} blog posts seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    process.exit(1);
  }
};

seedBlogPosts();
