# Hoteller Beach Hotel - Backend API

A comprehensive Node.js/Express backend API for a luxury hotel management system with booking, CMS, authentication, and admin features.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Passport.js (Google OAuth2)
- **File Upload**: Cloudinary
- **Language**: TypeScript
- **Dev Tools**: Nodemon, ts-node

## 📋 Features

### Authentication & Authorization
- JWT-based authentication
- Google OAuth2 integration
- Role-based access control (Admin, Staff, Guest)
- Secure password hashing with bcrypt
- Token refresh mechanism

### Booking Management
- Room availability checking
- Booking creation and management
- Status tracking (pending, confirmed, checked-in, checked-out, cancelled)
- Payment status management
- Invoice generation
- Guest booking history
- Admin booking oversight

### Room Management
- CRUD operations for rooms
- Room specifications (bed type, size, view, capacity)
- Availability status
- Cleaning and occupancy status
- Image gallery management
- Amenities and services tracking

### Content Management System (CMS)
- Dynamic page content management
- Blog post creation and editing
- Theme customization
- Contact settings
- Booking settings
- Site-wide settings

### User Management
- User registration and login
- Profile management
- Admin user management
- Role assignment
- User activation/deactivation

### File Management
- Cloudinary integration for image uploads
- Multiple image upload support
- Image optimization
- Secure file handling

### Expense Tracking
- Expense creation and management
- Category-based organization
- Date-based filtering
- Admin-only access

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Google OAuth credentials (optional)

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/hoteller-beach
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hoteller-beach

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

4. **Database Setup**

Start MongoDB locally or ensure your Atlas connection is working.

5. **Seed Initial Data**

```bash
# Create admin user
npm run seed:admin

# Seed rooms
npm run seed:rooms

# Seed blog posts
npm run seed:blog

# Seed room page content
npm run seed:rooms-content
```

6. **Start Development Server**

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── cloudinary.ts      # Cloudinary configuration
│   │   ├── database.ts        # MongoDB connection
│   │   └── passport.ts        # Passport strategies
│   ├── controllers/
│   │   ├── blogController.ts
│   │   ├── bookingController.ts
│   │   ├── contactSettingsController.ts
│   │   ├── expenseController.ts
│   │   └── uploadController.ts
│   ├── middleware/
│   │   └── auth.ts            # Authentication middleware
│   ├── models/
│   │   ├── Booking.ts
│   │   ├── Content.ts
│   │   ├── Expense.ts
│   │   ├── Room.ts
│   │   ├── Theme.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── blogRoutes.ts
│   │   ├── bookingRoutes.ts
│   │   ├── contactSettingsRoutes.ts
│   │   ├── contentRoutes.ts
│   │   ├── expenseRoutes.ts
│   │   ├── googleAuthRoutes.ts
│   │   ├── roomRoutes.ts
│   │   ├── themeRoutes.ts
│   │   └── uploadRoutes.ts
│   ├── scripts/
│   │   ├── exportDatabase.ts
│   │   ├── seedAdmin.ts
│   │   ├── seedBlogPosts.ts
│   │   ├── seedRooms.ts
│   │   └── seedRoomsPageContent.ts
│   └── server.ts              # Main application entry
├── doc/
│   ├── API_DOCUMENTATION.md
│   ├── API_ENDPOINTS.csv
│   ├── AUTH_GUIDE.md
│   ├── BACKEND_DOCUMENTATION.md
│   ├── CLOUDINARY_SETUP.md
│   ├── GOOGLE_AUTH_COMPLETE.md
│   └── GOOGLE_AUTH_SETUP.md
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/users` - Get all users (Admin)
- `POST /api/auth/users` - Create user (Admin)
- `PUT /api/auth/users/:id` - Update user (Admin)
- `DELETE /api/auth/users/:id` - Delete user (Admin)

### Google OAuth
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback

### Bookings
- `POST /api/bookings/check-availability` - Check room availability
- `POST /api/bookings` - Create booking (Guest)
- `GET /api/bookings` - Get all bookings (Admin/Staff)
- `GET /api/bookings/my-bookings` - Get user bookings (Guest)
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id/status` - Update booking status (Admin/Staff)
- `PATCH /api/bookings/:id/payment-status` - Update payment status (Admin/Staff)
- `DELETE /api/bookings/:id` - Cancel booking

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID
- `GET /api/rooms/available` - Get available rooms
- `POST /api/rooms` - Create room (Admin)
- `PUT /api/rooms/:id` - Update room (Admin)
- `DELETE /api/rooms/:id` - Delete room (Admin)

### Content (CMS)
- `GET /api/content` - Get all content
- `GET /api/content/:pageName` - Get content by page
- `POST /api/content` - Create content (Admin)
- `PUT /api/content/:pageName` - Update content (Admin)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get blog post by slug
- `POST /api/blog` - Create blog post (Admin)
- `PUT /api/blog/:id` - Update blog post (Admin)
- `DELETE /api/blog/:id` - Delete blog post (Admin)

### Theme
- `GET /api/theme` - Get theme settings
- `PUT /api/theme` - Update theme (Admin)

### Contact Settings
- `GET /api/contact-settings` - Get contact settings
- `PUT /api/contact-settings` - Update contact settings (Admin)

### Expenses
- `GET /api/expenses` - Get all expenses (Admin)
- `POST /api/expenses` - Create expense (Admin)
- `PUT /api/expenses/:id` - Update expense (Admin)
- `DELETE /api/expenses/:id` - Delete expense (Admin)

### File Upload
- `POST /api/upload/single` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images

## 🔐 Authentication

### JWT Token
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Role-Based Access
- **Admin**: Full access to all features
- **Staff**: Access to bookings and room management
- **Guest**: Access to own bookings and profile

## 🗄️ Database Models

### User
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  phone?: string
  role: 'admin' | 'staff' | 'guest'
  isActive: boolean
  googleId?: string
  billingInfo?: object
}
```

### Booking
```typescript
{
  roomId: string
  roomTitle: string
  userId?: ObjectId (ref: User)
  checkInDate: Date
  checkOutDate: Date
  adults: number
  children: number
  totalPrice: number
  guestInfo: {
    name: string
    email: string
    phone: string
  }
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  paymentMethod?: 'cash' | 'online' | 'card'
  invoiceNumber: string (auto-generated)
  specialRequests?: string
}
```

### Room
```typescript
{
  id: string (slug)
  title: string
  subtitle: string
  heroImage: string
  price: number
  isAvailable: boolean
  roomNumber?: string
  floor?: number
  cleaningStatus: 'clean' | 'dirty' | 'in-progress'
  occupancyStatus: 'vacant' | 'occupied' | 'reserved'
  specs: {
    bed: string
    capacity: string
    maxAdults: number
    maxChildren: number
    size: string
    view: string
  }
  description?: string[]
  gallery?: string[]
  amenities?: string[]
  services?: string[]
}
```

## 🔧 Scripts

```bash
# Development
npm run dev              # Start dev server with nodemon

# Production
npm run build           # Compile TypeScript
npm start              # Start production server

# Database Seeding
npm run seed:admin     # Create admin user
npm run seed:rooms     # Seed rooms
npm run seed:blog      # Seed blog posts
npm run seed:rooms-content  # Seed room page content

# Database Export
npm run export:db      # Export database to JSON
```

## 🌐 CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (development)
- Your production frontend URL (configure in .env)

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 5000) |
| NODE_ENV | Environment | No (default: development) |
| MONGODB_URI | MongoDB connection string | Yes |
| JWT_SECRET | JWT signing secret | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Yes |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Yes |
| GOOGLE_CLIENT_ID | Google OAuth client ID | No |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | No |
| GOOGLE_CALLBACK_URL | Google OAuth callback URL | No |
| FRONTEND_URL | Frontend URL for CORS | Yes |

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- CORS protection
- Input validation
- SQL injection prevention (MongoDB)
- XSS protection
- Rate limiting (recommended for production)

## 📊 Booking Logic

### Availability Check
- Only confirmed bookings block availability
- Pending bookings don't reserve rooms
- Cancelled bookings free up rooms
- Date overlap detection prevents double-booking

### Price Calculation
- Server-side calculation prevents tampering
- Based on room price × number of nights
- Additional services can be added

### Invoice Generation
- Auto-generated invoice numbers
- Format: `INV-{timestamp}-{random}`
- Unique per booking

## 🚀 Deployment

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Use MongoDB Atlas for database
- [ ] Configure production FRONTEND_URL
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Configure backup strategy
- [ ] Review CORS settings
- [ ] Secure environment variables

### Recommended Platforms
- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern platform with good DX
- **DigitalOcean**: App Platform or Droplets
- **AWS**: EC2 or Elastic Beanstalk
- **Render**: Free tier available

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
mongod --version

# Test connection
mongo mongodb://localhost:27017/hoteller-beach
```

### Cloudinary Upload Fails
- Verify credentials in .env
- Check file size limits
- Ensure proper MIME types

### JWT Token Errors
- Check JWT_SECRET is set
- Verify token format in Authorization header
- Check token expiration

## 📚 Documentation

Detailed documentation available in `/doc`:
- API Documentation
- Authentication Guide
- Cloudinary Setup
- Google OAuth Setup
- Backend Architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is proprietary software for Hoteller Beach Hotel.

## 👥 Support

For support, email support@hotellerbeach.com or open an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added Google OAuth and expense tracking
- **v1.2.0** - Enhanced booking system with user references
- **v1.3.0** - Added Cloudinary optimization

## 🎯 Roadmap

- [ ] Email notifications
- [ ] SMS notifications
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Loyalty program
- [ ] Review system
- [ ] Calendar integration
