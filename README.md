# EventSphere - Frontend Client

![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-000000?style=flat-square&logo=framer)
![License](https://img.shields.io/badge/License-ISC-yellow?style=flat-square)

EventSphere is a state-of-the-art frontend application for an event management and booking platform. It provides a fast, responsive, and beautiful user interface.

---

## 🌐 Live Demo

**➡️ [View Live Site →](https://eventsphere-api-client.vercel.app)**

---

## ✨ Main Features

### 👥 User Panel Features

#### 🏠 Homepage & Exploration

- Attractive homepage banner and featured event display
- Event cards with grid layout
- Smooth scroll animations

#### 🔍 Event Discovery

- Advanced event search and filtering
- Category-based browsing
- Price range filter
- Date-based filtering
- Sorting options (popularity, newest, price)

#### 🎫 Event Booking

- Easy one-click booking system
- Seat selection interface
- Booking confirmation page
- Downloadable ticket generation

#### 💝 Wishlist & Favorites

- Save favorite events
- Wishlist management
- Quick access to saved items

#### 📖 User Dashboard

- Booking history view
- Upcoming events tracking
- Booking status monitoring
- Option to cancel bookings

#### ⭐ Reviews & Ratings

- Submit event reviews
- Star rating system (1-5)
- Read other reviews

#### 👤 Profile Management

- Edit profile information
- Avatar upload
- Password change
- Account settings

### 🎛️ Admin Dashboard Features

#### 📊 Analytics & Reporting

- **Real-time Statistics:**
  - Total events, bookings, users, revenue
  - Monthly revenue trend chart (Recharts)
  - Category-based event distribution
  - Booking status pie chart
  - Top performing events

#### 📅 Event Management

- Event approval/rejection system
- Event creation and editing capability
- Pending events list
- Approved events list
- Event publish/unpublish

#### 🏷️ Category Management

- Add new categories
- Edit existing categories
- Delete categories
- Category list view

#### 🎟️ Booking Management

- Track all bookings
- Booking approval/cancellation
- Booking details view
- Refund processing

#### 👥 User Management

- View all users list
- User details view
- Change user roles
- Block user accounts
- Delete users

#### 📝 Content Moderation

- Blog post moderation
- FAQ management
- Review approval/rejection
- Track contact messages

### 🎨 User Experience (UX) Features

#### ✨ Animations & Transitions

- Beautiful micro-animations with Framer Motion
- Page transition animations
- Hover effects and transitions
- Scroll-triggered animations

#### 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop perfect layout
- Consistent across all devices

#### 🌓 Modern UI Components

- Premium custom components
- Beautiful form design
- Attractive card layout
- Interactive buttons and fields

---

## 🛠️ Tech Stack

| Category             | Technology        | Details                           |
| -------------------- | ----------------- | --------------------------------- |
| **Framework**        | Next.js 16.2      | React framework with App Router   |
| **Runtime**          | React 19          | Latest React version              |
| **Language**         | TypeScript 5.x    | Type-safe development             |
| **Styling**          | Tailwind CSS 4    | Utility-first CSS framework       |
| **Animation**        | Framer Motion 12  | Advanced animations & transitions |
| **Icons**            | Lucide React      | Beautiful icon library            |
| **Charts**           | Recharts 3.9      | React charting library            |
| **UI Components**    | Custom Components | Built from scratch with Tailwind  |
| **State Management** | React Context API | Built-in state management         |
| **HTTP Client**      | Fetch API         | Native HTTP requests              |

---

## 📦 Environment Variables Configuration

Create a `.env.local` file in your project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# For production:
# NEXT_PUBLIC_API_URL=https://eventsphere-api.vercel.app/api

# App Configuration
NEXT_PUBLIC_APP_NAME=EventSphere
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note:** Variables with `NEXT_PUBLIC_` prefix are accessible on the client-side.

---

## 🚀 Installation & Running Guide

### Prerequisites

- Node.js 18+ and pnpm/npm/yarn
- Git installed

### Step 1: Clone the Repository

```bash
git clone https://github.com/shahrierbiddut/EventSphere-client.git
cd EventSphere-client
```

### Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or npm
npm install

# Or yarn
yarn install
```

### Step 3: Setup Environment Variables

```bash
# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=EventSphere
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
```

### Step 4: Start Development Server

```bash
pnpm dev
# Or
npm run dev
```

Application is now running at [http://localhost:3000](http://localhost:3000).

### Step 5: Production Build

```bash
# Build the project
pnpm build

# Test locally
pnpm start
```

### Step 6: Deploy to Vercel (Optional)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 📁 Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Home page
│   │   ├── globals.css                # Global styles
│   │   ├── (auth)/                    # Authentication routes
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/               # User dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── bookings/page.tsx
│   │   │   ├── create-event/page.tsx
│   │   │   ├── favorites/page.tsx
│   │   │   ├── notifications/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── (admin)/                   # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   └── dashboard/
│   │   │       ├── page.tsx
│   │   │       ├── analytics/page.tsx
│   │   │       ├── bookings/page.tsx
│   │   │       ├── categories/page.tsx
│   │   │       ├── events/page.tsx
│   │   │       ├── users/page.tsx
│   │   │       └── blogs/page.tsx
│   │   └── (guest)/                   # Public pages
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── about/page.tsx
│   │       ├── blog/page.tsx
│   │       ├── categories/page.tsx
│   │       ├── contact/page.tsx
│   │       ├── events/page.tsx
│   │       ├── explore/page.tsx
│   │       └── faq/page.tsx
│   ├── components/
│   │   ├── admin/                     # Admin components
│   │   │   ├── AdminCharts.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminStatsCard.tsx
│   │   │   └── AdminUI.tsx
│   │   ├── dashboard/                 # User dashboard components
│   │   │   ├── BookingCard.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── FavoriteCard.tsx
│   │   │   └── StatsCard.tsx
│   │   ├── events/                    # Event components
│   │   │   └── EventCard.tsx
│   │   ├── layout/                    # Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── ui/                        # Reusable UI components
│   │       ├── Alert.tsx
│   │       ├── Avatar.tsx
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Skeleton.tsx
│   │       └── Textarea.tsx
│   ├── data/                          # Static data
│   │   ├── blogPosts.ts
│   │   ├── categories.ts
│   │   ├── events.ts
│   │   ├── faqs.ts
│   │   └── testimonials.ts
│   ├── lib/                           # Utility functions
│   │   ├── api.ts                     # API call helpers
│   │   ├── AuthContext.tsx            # Authentication context
│   │   ├── ThemeContext.tsx           # Theme context
│   │   └── utils.ts                   # General utilities
│   └── types/
│       └── index.ts                   # TypeScript type definitions
├── public/                            # Static assets
├── .env.local                         # Environment variables
├── .env.example                       # Environment template
├── tsconfig.json                      # TypeScript config
├── next.config.ts                     # Next.js config
├── tailwind.config.ts                 # Tailwind config
├── postcss.config.mjs                 # PostCSS config
├── package.json                       # Dependency file
└── README.md                          # This file
```

---

## 🔧 Development Scripts

```bash
# Start development server
pnpm dev

# Production build
pnpm build

# Test production build locally
pnpm start

# Check linting
pnpm lint

# Fix linting issues
pnpm lint --fix
```

---

## 🧪 Testing Accounts

### General User Account

```
Email:    user@example.com
Password: User@123456
```

### Admin Account

```
Email:    admin@eventsphere.com
Password: Admin@123456
```

### Test Credentials for Features

| Role  | Email                 | Password     | Features                          |
| ----- | --------------------- | ------------ | --------------------------------- |
| User  | user@example.com      | User@123456  | Event Booking, Reviews, Favorites |
| Admin | admin@eventsphere.com | Admin@123456 | Dashboard, Analytics, Approvals   |

---

## 🎨 Custom UI Components

### Available Components

#### Button

```tsx
<Button variant="primary" size="lg" onClick={() => {}}>
  Click me
</Button>
```

#### Card

```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content here</Card.Body>
</Card>
```

#### Badge

```tsx
<Badge variant="success">Active</Badge>
```

#### Input

```tsx
<Input type="email" placeholder="Enter email" onChange={(e) => {}} />
```

#### Alert

```tsx
<Alert variant="info" title="Info">
  This is an informational message
</Alert>
```

আরও উদাহরণ `src/components/ui/` তে দেখুন।

---

## 🌟 Performance Optimization

- ✅ **Next.js Image Optimization** - Automatic image optimization
- ✅ **Code Splitting** - Automatic code splitting
- ✅ **Lazy Loading** - Component lazy loading
- ✅ **CSS-in-JS** - Optimized CSS with Tailwind
- ✅ **Compression** - Gzip compression support

---

## 🔐 Security Features

- ✅ **XSS Protection** - Input sanitization
- ✅ **CSRF Token** - Cross-site request forgery prevention
- ✅ **JWT Secure Storage** - Secure token storage in localStorage
- ✅ **HTTPS Enforced** - Secure connections only
- ✅ **Content Security Policy** - CSP headers

---

## 🐛 Troubleshooting

### API Connection Error

```
Error: Failed to fetch from API
```

**Solution:**

- Ensure server is running
- Check `.env.local` configuration
- Check browser console for errors

### Tailwind Styles Not Working

```
Error: Styles not appearing
```

**Solution:**

- Restart `pnpm dev`
- Clear cache: `rm -rf .next`
- Reinstall node modules

### 401/403 Authentication Error

```
Error: Unauthorized access
```

**Solution:**

- Log in
- Check if token has expired
- Clear browser cookies

---

## 📊 Analytics Integration

Currently implemented features with Recharts:

- Revenue trend chart
- Category distribution pie chart
- Booking status bar chart

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# One-click deployment
vercel
```

### Docker (Optional)

```bash
docker build -t eventsphere-client .
docker run -p 3000:3000 eventsphere-client
```

### Manual Deployment

```bash
pnpm build
pnpm start
```

---

## 🔗 Related Repositories

- **Backend Server:** [EventSphere-server](https://github.com/shahrierbiddut/EventSphere-server)
- **API Documentation:** [Server Docs](https://github.com/shahrierbiddut/EventSphere-server#api-routes--endpoints)

---

## 📞 Support & Contact

- **Live Site:** [eventsphere-api-client.vercel.app](https://eventsphere-api-client.vercel.app)
- **GitHub Issues:** [EventSphere-client Issues](https://github.com/shahrierbiddut/EventSphere-client/issues)
- **Project Repository:** [EventSphere-client](https://github.com/shahrierbiddut/EventSphere-client)

---

## 📄 License

This project is distributed under the ISC License. See the [LICENSE](LICENSE) file for more details.

---

## 🙏 Acknowledgments

- Vercel & Next.js team
- Tailwind CSS foundation
- React community
- Framer Motion team

---

**Last Updated:** July 2024
**Version:** 1.0.0

### Happy Coding! 🎉
