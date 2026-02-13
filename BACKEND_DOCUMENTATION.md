# Hotel Beach - Backend Documentation

## Overview

The backend is built with Node.js, Express, TypeScript, and MongoDB, providing a robust REST API for the Hotel Beach booking system with authentication, authorization, and comprehensive data management.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + Passport.js
- **Image Storage:** Cloudinary
- **Password Hashing:** Bcrypt
- **Validation:** Express Validator
- **Environment:** dotenv

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/                    # Configuration files
│   │   ├── database.ts           # MongoDB connection
│   │   ├── passport.ts           # Passport strategies
│   │   └── cloudinary.ts         # Cloudinary setup
│   │
│   ├── models/                    # Mongoose models
│   │   ├── User.ts               # User schema
│   │   ├── Room.ts               # Room schema
│   │   ├── Booking.ts            # Booking schema
│   │   ├── Theme.ts              # CMS theme schema
│   │   ├── BlogPost.ts           # Blog post schema
│   │   └── ContactSettings.ts    # Contact settings schema
│   │
│   ├── controllers/               # Business logic
│   │   ├── authController.ts     # Authentication logic
│   │   ├── roomController.ts     # Room management
│   │   ├── bookingController.ts  # Booking management
│   │   ├── themeController.ts    # CMS logic
│   │   ├── blogController.ts     # Blog management
│   │   ├── uploadController.ts   # Image uploads
│   │   └── contactSettingsController.ts # Contact settings
│   │
│   ├── routes/                    # API routes
│   │   ├── authRoutes.ts         # Auth endpoints
│   │   ├── googleAuthRoutes.ts   # Google OAuth
│   │   ├── roomRoutes.ts         # Room endpoints
│   │   ├── bookingRoutes.ts      # Booking endpoints
│   │   ├── themeRoutes.ts        # CMS endpoints
│   │   ├── blogRoutes.ts         # Blog endpoints
│   │   ├── uploadRoutes.ts       # Upload endpoints
│   │   └── contactSettingsRoutes.ts # Contact endpoints
│   │
│   ├── middleware/                # Middleware functions
│   │   └── auth.ts               # Auth middleware (protect, authorize)
│   │
│   ├── scripts/                   # Utility scripts
│   │   ├── seedAdmin.ts          # Seed admin user
│   │   ├── seedRooms.ts          # Seed rooms
│   │   ├── seedBlogPosts.ts      # Seed blog posts
│   │   └── seedRoomsPageContent.ts # Seed CMS content
│   │
│   └── server.ts                  # Application entry point
│
├── doc/                           # Documentation
│   ├── API_DOCUMENTATION.md      # API docs
│   ├── API_ENDPOINTS.csv         # Endpoint list
│   ├── AUTH_GUIDE.md             # Auth guide
│   ├── GOOGLE_AUTH_SETUP.md      # OAuth setup
│   ├── GOOGLE_AUTH_STATUS.md     # OAuth status
│   ├── GOOGLE_AUTH_COMPLETE.md   # OAuth completion
│   ├── CLOUDINARY_SETUP.md       # Image setup
│   └── BACKEND_STATUS.md         # Backend status
│
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── nodemon.json                   # Nodemon config
└── README.md                      # Project readme
```

---

## 🗄️ Database Models

### User Model
```typescript
interface IUser {
  email: string;              // Unique, required
  password: string;           // Hashed with bcrypt
  name: string;               // Required
  phone?: string;             // Optional
  role: 'admin' | 'staff' | 'guest'; // Default: 'guest'
  isActive: boolean;          // Default: true
  googleId?: string;          // For OAuth users
  billingInfo?: {
    country?: string;
    address?: string;
    city?: string;
    state?: string;
    postcode?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

**Methods:**
- `matchPassword(enteredPassword)` - Compare passwords
- `getSignedJwtToken()` - Generate JWT token

**Hooks:**
- Pre-save: Hash password if modified

### Room Model
```typescript
interface IRoom {
  name: string;               // Required
  slug: string;               // Unique, auto-generated
  description: string;        // Required
  price: number;              // Required, min: 0
  images: string[];           // Cloudinary URLs
  capacity: {
    adults: number;           // Required, min: 1
    children: number;         // Required, min: 0
  };
  amenities: string[];        // Array of amenity names
  size: number;               // Square meters
  bedType: string;            // e.g., "King", "Queen"
  view: string;               // e.g., "Sea View"
  isAvailable: boolean;       // Default: true
  featured: boolean;          // Default: false
  createdAt: Date;
  updatedAt: Date;
}
```

**Hooks:**
- Pre-save: Generate slug from name

### Booking Model
```typescript
interface IBooking {
  user: ObjectId;             // Ref: User
  room: ObjectId;             // Ref: Room
  checkInDate: Date;          // Required
  checkOutDate: Date;         // Required
  guests: {
    adults: number;           // Required, min: 1
    children: number;         // Default: 0
  };
  guestDetails: {
    name: string;
    email: string;
    phone: string;
    country?: string;
    address?: string;
    city?: string;
    state?: string;
    postcode?: string;
  };
  totalPrice: number;         // Required, min: 0
  currency: string;           // Default: 'USD'
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: string;
  specialRequests?: string;
  bookingReference: string;   // Unique, auto-generated
  createdAt: Date;
  updatedAt: Date;
}
```

**Hooks:**
- Pre-save: Generate unique booking reference

**Populate:**
- User details
- Room details

### Theme Model (CMS)
```typescript
interface ITheme {
  pageName: string;           // Unique (e.g., 'home', 'about')
  sections: [{
    sectionId: string;        // Unique identifier
    sectionName: string;      // Display name
    title?: string;
    subtitle?: string;
    images?: string[];        // Cloudinary URLs
    items?: any[];            // Dynamic content
    isVisible: boolean;       // Default: true
    order: number;            // Display order
  }];
  metadata: {
    pageTitle: string;
    pageDescription: string;
    keywords?: string[];
  };
  updatedAt: Date;
}
```

### BlogPost Model
```typescript
interface IBlogPost {
  title: string;              // Required
  slug: string;               // Unique, auto-generated
  content: string;            // Required
  excerpt: string;            // Required
  featuredImage?: string;     // Cloudinary URL
  category: string;           // Required
  tags: string[];             // Array of tags
  author: ObjectId;           // Ref: User
  status: 'draft' | 'published'; // Default: 'draft'
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

**Hooks:**
- Pre-save: Generate slug from title
- Pre-save: Set publishedAt when status changes to 'published'

### ContactSettings Model
```typescript
interface IContactSettings {
  phone: string;              // Default: '+30 228 601 2345'
  email: string;              // Default: 'concierge@hotelbeach.com'
  location: {
    address: string;          // Default: 'Perissa Beach'
    city: string;             // Default: 'Santorini'
    country: string;          // Default: 'Greece'
    postalCode: string;       // Default: '84703'
  };
  serviceHours: {
    frontDesk: string;        // Default: '24/7'
    roomService: string;      // Default: '24/7'
    concierge: string;        // Default: '7am - 11pm'
    spa: string;              // Default: '9am - 8pm'
    restaurant: string;       // Default: '7am - 10pm'
  };
  emergencyHotline: string;   // Default: '+30 228 601 2345'
  updatedAt: Date;
}
```

---

## 🔐 Authentication & Authorization

### JWT Authentication
- Token-based authentication
- Tokens expire in 7 days (configurable)
- Stored in localStorage on frontend
- Sent in Authorization header: `Bearer <token>`

### Password Security
- Hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Compared using bcrypt.compare()

### Google OAuth
- Passport.js Google Strategy
- OAuth 2.0 flow
- Auto-creates user account
- Returns JWT token

### Middleware

#### `protect` Middleware
```typescript
// Verifies JWT token
// Attaches user to request object
// Returns 401 if invalid/missing token
```

#### `authorize` Middleware
```typescript
// Checks user role
// Usage: authorize('admin', 'staff')
// Returns 403 if unauthorized role
```

---

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)

```
POST   /register
Body: { email, password, name, phone? }
Response: { success, data: { user, token } }
Public

POST   /login
Body: { email, password }
Response: { success, data: { user, token } }
Public

GET    /profile
Headers: Authorization: Bearer <token>
Response: { success, data: user }
Protected

PUT    /profile
Headers: Authorization: Bearer <token>
Body: { name?, phone?, billingInfo? }
Response: { success, data: user }
Protected

POST   /change-password
Headers: Authorization: Bearer <token>
Body: { currentPassword, newPassword }
Response: { success, message }
Protected

GET    /users
Headers: Authorization: Bearer <token>
Response: { success, data: users[] }
Protected (Admin only)

POST   /users
Headers: Authorization: Bearer <token>
Body: { email, password, name, phone?, role }
Response: { success, data: user }
Protected (Admin only)

PUT    /users/:id
Headers: Authorization: Bearer <token>
Body: { role?, isActive? }
Response: { success, data: user }
Protected (Admin only)

DELETE /users/:id
Headers: Authorization: Bearer <token>
Response: { success, message }
Protected (Admin only)
```

### Google OAuth Routes (`/api/auth`)

```
GET    /google
Initiates Google OAuth flow
Public

GET    /google/callback
OAuth callback URL
Returns: Redirect to frontend with token
Public
```

### Room Routes (`/api/rooms`)

```
GET    /
Query: ?featured=true
Response: { success, data: rooms[] }
Public

GET    /:id
Response: { success, data: room }
Public

GET    /available
Query: ?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
Response: { success, data: rooms[] }
Public

POST   /
Headers: Authorization: Bearer <token>
Body: { name, description, price, capacity, amenities, ... }
Response: { success, data: room }
Protected (Admin only)

PUT    /:id
Headers: Authorization: Bearer <token>
Body: { name?, description?, price?, ... }
Response: { success, data: room }
Protected (Admin only)

DELETE /:id
Headers: Authorization: Bearer <token>
Response: { success, message }
Protected (Admin only)
```

### Booking Routes (`/api/bookings`)

```
POST   /check-availability
Body: { roomId, checkInDate, checkOutDate }
Response: { success, available: boolean }
Public

POST   /
Headers: Authorization: Bearer <token>
Body: { roomId, checkInDate, checkOutDate, guests, guestDetails, totalPrice, currency }
Response: { success, data: booking }
Protected

GET    /
Headers: Authorization: Bearer <token>
Query: ?status=confirmed&page=1&limit=10
Response: { success, data: bookings[], pagination }
Protected (Admin/Staff)

GET    /my-bookings
Headers: Authorization: Bearer <token>
Response: { success, data: bookings[] }
Protected

GET    /:id
Headers: Authorization: Bearer <token>
Response: { success, data: booking }
Protected

PATCH  /:id/status
Headers: Authorization: Bearer <token>
Body: { status: 'confirmed' | 'cancelled' | 'completed' }
Response: { success, data: booking }
Protected (Admin/Staff)

PATCH  /:id/payment-status
Headers: Authorization: Bearer <token>
Body: { paymentStatus: 'paid' | 'refunded', paymentMethod? }
Response: { success, data: booking }
Protected (Admin/Staff)

DELETE /:id
Headers: Authorization: Bearer <token>
Response: { success, message }
Protected
```

### Content/CMS Routes (`/api/content`)

```
GET    /
Response: { success, data: themes[] }
Public

GET    /:pageName
Params: pageName (e.g., 'home', 'about')
Response: { success, data: theme }
Public

POST   /
Headers: Authorization: Bearer <token>
Body: { pageName, sections, metadata }
Response: { success, data: theme }
Protected (Admin only)

PUT    /:pageName
Headers: Authorization: Bearer <token>
Body: { sections?, metadata? }
Response: { success, data: theme }
Protected (Admin only)
```

### Blog Routes (`/api/blog`)

```
GET    /
Query: ?category=travel&status=published
Response: { success, data: posts[] }
Public

GET    /:slug
Response: { success, data: post }
Public

POST   /
Headers: Authorization: Bearer <token>
Body: { title, content, excerpt, category, tags, featuredImage?, status }
Response: { success, data: post }
Protected (Admin only)

PUT    /:id
Headers: Authorization: Bearer <token>
Body: { title?, content?, excerpt?, ... }
Response: { success, data: post }
Protected (Admin only)

DELETE /:id
Headers: Authorization: Bearer <token>
Response: { success, message }
Protected (Admin only)
```

### Contact Settings Routes (`/api/contact-settings`)

```
GET    /
Response: { success, data: settings }
Public

PUT    /
Headers: Authorization: Bearer <token>
Body: { phone?, email?, location?, serviceHours?, emergencyHotline? }
Response: { success, data: settings }
Protected (Admin only)
```

### Upload Routes (`/api/upload`)

```
POST   /
Headers: Authorization: Bearer <token>
Body: FormData with 'image' field
Response: { success, url: string }
Protected
```

---

## ⚙️ Configuration

### Database Connection (`config/database.ts`)
```typescript
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
```

### Passport Configuration (`config/passport.ts`)
```typescript
// JWT Strategy
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  // Verify user from token
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create user
}));
```

### Cloudinary Configuration (`config/cloudinary.ts`)
```typescript
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

---

## 🔧 Middleware

### Authentication Middleware (`middleware/auth.ts`)

#### `protect`
- Verifies JWT token from Authorization header
- Decodes token and finds user
- Attaches user to `req.user`
- Returns 401 if token invalid/missing

#### `authorize(...roles)`
- Checks if `req.user.role` matches allowed roles
- Returns 403 if unauthorized
- Usage: `authorize('admin', 'staff')`

---

## 📝 Controllers

### Auth Controller
- `register` - Create new user account
- `login` - Authenticate user
- `getProfile` - Get current user profile
- `updateProfile` - Update user profile
- `changePassword` - Change user password
- `getAllUsers` - Get all users (Admin)
- `createUser` - Create user (Admin)
- `updateUser` - Update user role/status (Admin)
- `deleteUser` - Delete user (Admin)

### Room Controller
- `getAllRooms` - Get all rooms with filters
- `getRoomById` - Get single room
- `getAvailableRooms` - Check availability
- `createRoom` - Create new room (Admin)
- `updateRoom` - Update room (Admin)
- `deleteRoom` - Delete room (Admin)

### Booking Controller
- `checkAvailability` - Check room availability
- `createBooking` - Create new booking
- `getAllBookings` - Get all bookings (Admin/Staff)
- `getMyBookings` - Get user's bookings
- `getBookingById` - Get single booking
- `updateBookingStatus` - Update status (Admin/Staff)
- `updatePaymentStatus` - Update payment (Admin/Staff)
- `cancelBooking` - Cancel booking

### Theme Controller (CMS)
- `getAllThemes` - Get all page themes
- `getThemeByPage` - Get specific page theme
- `createTheme` - Create page theme (Admin)
- `updateTheme` - Update page theme (Admin)

### Blog Controller
- `getAllPosts` - Get all blog posts
- `getPostBySlug` - Get single post
- `createPost` - Create new post (Admin)
- `updatePost` - Update post (Admin)
- `deletePost` - Delete post (Admin)

### Upload Controller
- `uploadImage` - Upload image to Cloudinary

### Contact Settings Controller
- `getContactSettings` - Get contact information
- `updateContactSettings` - Update contact info (Admin)

---

## 🚀 Setup & Development

### Installation
```bash
npm install
```

### Environment Variables (`.env`)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/hotel-beach
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-beach

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### Database Seeding
```bash
# Seed admin user
npm run seed:admin

# Seed rooms
npm run seed:rooms

# Seed blog posts
npm run seed:blog

# Seed CMS content
npm run seed:rooms-page
```

### Development
```bash
npm run dev
# Server runs on http://localhost:5000
```

### Production Build
```bash
npm run build
npm start
```

---

## 📦 Dependencies

### Core
- express: ^4.18.0
- mongoose: ^7.5.0
- typescript: ^5.0.0

### Authentication
- jsonwebtoken: ^9.0.0
- bcryptjs: ^2.4.3
- passport: ^0.6.0
- passport-jwt: ^4.0.1
- passport-google-oauth20: ^2.0.0

### Utilities
- dotenv: ^16.3.0
- cors: ^2.8.5
- cloudinary: ^1.40.0
- multer: ^1.4.5-lts.1

### Development
- nodemon: ^3.0.0
- ts-node: ^10.9.0
- @types/express: ^4.17.0
- @types/node: ^20.0.0

---

## 🔒 Security Best Practices

### Implemented
✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Role-based access control
✅ CORS configuration
✅ Environment variables for secrets
✅ Input validation
✅ MongoDB injection prevention (Mongoose)
✅ Rate limiting ready
✅ Helmet.js ready

### Recommended Additions
- [ ] Rate limiting (express-rate-limit)
- [ ] Helmet.js for security headers
- [ ] Input sanitization
- [ ] Request validation (express-validator)
- [ ] HTTPS in production
- [ ] Security audits
- [ ] Logging (Winston/Morgan)
- [ ] Error tracking (Sentry)

---

## 📊 Database Indexes

### User Model
- `email` - Unique index
- `googleId` - Sparse index

### Room Model
- `slug` - Unique index
- `isAvailable` - Index for filtering

### Booking Model
- `bookingReference` - Unique index
- `user` - Index for user queries
- `room` - Index for room queries
- `checkInDate, checkOutDate` - Compound index for availability

### Theme Model
- `pageName` - Unique index

### BlogPost Model
- `slug` - Unique index
- `status` - Index for filtering
- `category` - Index for filtering

---

## 🧪 Testing

### Manual Testing
- API endpoint testing with Postman/Thunder Client
- Database operations verification
- Authentication flow testing
- Authorization testing
- Error handling verification

### Recommended Testing Tools
- Jest for unit tests
- Supertest for API tests
- MongoDB Memory Server for test database

---

## 📈 Performance Optimization

### Implemented
- MongoDB indexes
- Mongoose lean queries where appropriate
- Pagination for large datasets
- Efficient population of references

### Recommended Additions
- [ ] Redis caching
- [ ] Query optimization
- [ ] Database connection pooling
- [ ] Compression middleware
- [ ] CDN for static assets
- [ ] Load balancing
- [ ] Database replication

---

## 🚧 Future Enhancements

- [ ] Email service (SendGrid/Nodemailer)
- [ ] SMS notifications (Twilio)
- [ ] Payment gateway (Stripe/PayPal)
- [ ] WebSocket for real-time updates
- [ ] Advanced search with Elasticsearch
- [ ] Caching with Redis
- [ ] Queue system (Bull/RabbitMQ)
- [ ] Microservices architecture
- [ ] GraphQL API
- [ ] API versioning
- [ ] Swagger/OpenAPI documentation
- [ ] Automated testing
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Kubernetes orchestration

---

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## 🔍 Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Error Middleware
```typescript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});
```

---

## 📞 Support

For issues or questions:
- GitHub Issues: [Backend Repository](https://github.com/Ramoniswack/hotel-beach-backend)
- Email: dev@hotelbeach.com

---

**Last Updated:** February 13, 2026
**Version:** 1.0.0
