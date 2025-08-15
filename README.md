# Chazon

A full-featured Chazon app built with Next.js 14, Prisma, and modern web technologies. This platform connects customers with skilled service providers (Stewards) for various everyday tasks.

## 🚀 Features

### For Customers
- **Service Discovery**: Browse and search through various service categories
- **Steward Profiles**: View detailed profiles with ratings, reviews, and portfolios
- **Booking System**: Schedule services with preferred Stewards
- **Real-time Messaging**: Communicate with Stewards before and during tasks
- **Secure Payments**: Integrated Stripe payment processing
- **Review System**: Rate and review completed services
- **Order Tracking**: Track booking status in real-time

### For Stewards
- **Profile Management**: Create detailed professional profiles
- **Service Listings**: List and manage offered services
- **Availability Management**: Set working hours and availability
- **Earnings Dashboard**: Track income and completed tasks
- **Customer Communication**: Built-in messaging system
- **Portfolio Showcase**: Display work samples and certifications

### Platform Features
- **Authentication**: Multi-provider auth (Google, GitHub, Email/Password)
- **Responsive Design**: Mobile-first, fully responsive UI
- **Real-time Notifications**: Push notifications for important updates
- **Admin Dashboard**: Platform management and analytics
- **Search & Filters**: Advanced search with location and category filters
- **Trust & Safety**: Background checks and verification system

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zustand** - State management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM and migrations
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication solution
- **Stripe** - Payment processing
- **Cloudinary** - Image upload and management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Prisma Studio** - Database GUI

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Stripe account for payments
- Cloudinary account for image uploads
- Google/GitHub OAuth apps (optional)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd chazon-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/chazon_app"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
chazon-app/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── services/          # Service pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── home/             # Homepage components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: Customer and Steward profiles
- **Categories**: Service categories
- **Services**: Individual service listings
- **Bookings**: Service bookings and appointments
- **Reviews**: Customer reviews and ratings
- **Messages**: In-app messaging system
- **Payments**: Payment transactions
- **Notifications**: System notifications

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data
```

## 🔐 Authentication

The app supports multiple authentication methods:

1. **Email/Password**: Traditional signup with email verification
2. **Google OAuth**: Sign in with Google account
3. **GitHub OAuth**: Sign in with GitHub account

## 💳 Payment Integration

Stripe is integrated for secure payment processing:

- Credit/Debit card payments
- Payment intent creation
- Webhook handling for payment events
- Refund processing
- Payment history tracking

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chazon](https://www.chazon.com) for inspiration (assuming a similar domain for the new brand)
- [Shadcn/ui](https://ui.shadcn.com) for UI components
- [Lucide](https://lucide.dev) for icons
- [Unsplash](https://unsplash.com) for sample images

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact the development team.

---

**Note**: This is an educational project and is not affiliated with any existing platform.