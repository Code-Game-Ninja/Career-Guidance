# 🎓 Career Guidance System

A comprehensive career guidance platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring aptitude assessments, college recommendations, and personalized career guidance.

## ✨ Features

- **🎯 Aptitude Assessment**: Comprehensive tests to discover strengths and interests
- **🏫 College Database**: 999+ colleges with detailed information and rankings
- **📊 Career Analytics**: Personalized recommendations based on test results
- **👨‍💼 Expert Guidance**: Professional career counseling resources
- **🔐 User Authentication**: Secure JWT-based authentication system
- **👨‍💻 Admin Panel**: Complete CRUD operations for content management
- **📱 Responsive Design**: Modern UI that works on all devices
- **🎨 Material Design**: Beautiful, modern interface with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/career-guidance.git
   cd career-guidance
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   cd ..
   ```

3. **Environment Setup**
   
   Create `.env` file in the `server/` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   npm run start
   ```

   This will start both frontend (http://localhost:5173) and backend (http://localhost:5000)

## 🏗️ Project Structure

```
career-guidance/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.jsx           # Main navigation
│   │   └── PrivateRoute.jsx     # Route protection
│   ├── contexts/                # React contexts
│   │   └── AuthContext.jsx      # Authentication state
│   ├── pages/                   # Application pages
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # User login
│   │   ├── Signup.jsx          # User registration
│   │   ├── Quiz.jsx            # Aptitude test
│   │   ├── Career.jsx          # Career recommendations
│   │   ├── Collage.jsx         # College listings
│   │   ├── Dashboard.jsx       # User dashboard
│   │   ├── AdminLogin.jsx      # Admin authentication
│   │   ├── AdminDashboard.jsx  # Admin main panel
│   │   ├── AdminQuestions.jsx  # Question management
│   │   ├── AdminColleges.jsx   # College management
│   │   ├── AdminUsers.jsx      # User management
│   │   └── AdminAnalytics.jsx  # Analytics dashboard
│   ├── utils/                   # Utility functions
│   │   └── collegeDataProcessor.js
│   ├── App.jsx                 # Main application component
│   ├── index.css               # Global styles
│   └── main.jsx                # Application entry point
├── server/                      # Backend Node.js application
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js            # User model
│   │   ├── Question.js        # Question model
│   │   ├── College.js         # College model
│   │   └── Result.js          # Test result model
│   ├── routes/                 # API routes
│   │   ├── auth.js            # Authentication routes
│   │   ├── aptitude.js        # Test routes
│   │   ├── user.js            # User routes
│   │   ├── admin.js           # Admin routes
│   │   └── colleges.js        # College routes
│   ├── middleware/             # Custom middleware
│   │   └── auth.js            # JWT authentication
│   └── server.js              # Express server
├── public/                     # Static assets
├── package.json                # Frontend dependencies
├── vercel.json                # Vercel deployment config
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.js          # PostCSS configuration
└── README.md                  # Project documentation
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Full Stack
- `npm run start` - Start both frontend and backend
- `npm run server` - Start only backend server

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  savedColleges: [ObjectId],
  testHistory: [ObjectId],
  isActive: Boolean
}
```

### Question Model
```javascript
{
  text: String,
  category: String,
  difficulty: String,
  options: [{
    label: String,
    value: String,
    tags: [String]
  }],
  isActive: Boolean,
  order: Number
}
```

### College Model
```javascript
{
  name: String,
  location: {
    state: String,
    city: String,
    address: String
  },
  rating: Number,
  streams: [String],
  interestTags: [String],
  courses: [String],
  website: String,
  isActive: Boolean
}
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **User Registration**: `/api/auth/signup`
- **User Login**: `/api/auth/login`
- **Admin Login**: `/api/auth/admin-login`
- **Token Verification**: Automatic via middleware

### Test Credentials
- **Regular User**: `test@example.com` / `password123`
- **Admin User**: `admin@careerguidance.com` / `admin123`

## 🚀 Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Environment Variables

**Frontend (VITE_*):**
- `VITE_API_URL`: Production API URL

**Backend:**
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT secret key
- `JWT_EXPIRE`: Token expiration time
- `NODE_ENV`: Environment (production/development)

## 🎨 UI/UX Features

- **Material Design**: Modern Google Material Design principles
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: CSS transitions and Framer Motion
- **Dark Mode Ready**: CSS variables for theming
- **Accessibility**: Proper focus management and ARIA labels
- **Loading States**: Skeleton loading and spinners
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **CORS Protection**: Configured for production domains
- **Rate Limiting**: API request throttling
- **Input Validation**: Express-validator for data validation
- **Helmet.js**: Security headers

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/me` - Get current user

### Aptitude Tests
- `GET /api/aptitude/questions` - Get test questions
- `POST /api/aptitude/submit` - Submit test results
- `GET /api/aptitude/history` - Get test history

### Colleges
- `GET /api/colleges` - Get colleges with filters
- `GET /api/colleges/filters` - Get filter options
- `GET /api/colleges/:id` - Get specific college

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/saved-colleges` - Get saved colleges
- `POST /api/user/save-college` - Save college
- `DELETE /api/user/remove-college/:id` - Remove saved college

### Admin (Protected)
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/questions` - Manage questions
- `POST /api/admin/questions` - Create question
- `PUT /api/admin/questions/:id` - Update question
- `DELETE /api/admin/questions/:id` - Delete question
- `GET /api/admin/colleges` - Manage colleges
- `GET /api/admin/users` - Manage users

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review the troubleshooting section in the deployment guide

## 🎉 Acknowledgments

- MongoDB Atlas for database hosting
- Vercel for deployment platform
- Tailwind CSS for the amazing utility classes
- The React and Node.js communities for excellent documentation
