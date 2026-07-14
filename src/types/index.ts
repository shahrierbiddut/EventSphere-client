export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  photoUrl?: string
}

export interface UserProfile extends User {
  phone?: string
  bio?: string
  address?: string
  favoriteEvents?: string[] | Event[]
}

export interface Booking {
  id: string
  _id?: string
  event: Event
  user: string
  quantity: number
  totalPrice: number
  status: "confirmed" | "cancelled" | "pending"
  ticketCode?: string
  createdAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "booking" | "system" | "reminder"
  isRead: boolean
  createdAt: string
}

export interface Organizer {
  id: string
  name: string
  logoUrl?: string
  description?: string
  contactEmail?: string
  contactPhone?: string
}

export interface Event {
  id: string
  _id?: string
  title: string
  slug: string
  category: string
  date: string
  time: string
  location: string
  venue: string
  price: number
  isFree: boolean
  availableSeats: number
  totalSeats: number
  rating: number
  reviewCount: number
  imageUrl: string
  galleryImages: string[]
  organizer: Organizer
  shortDescription: string
  description: string
  isFeatured: boolean
}

export interface Category {
  _id?: string
  id: string
  name: string
  slug: string
  iconName: string
  eventCount: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatarUrl: string
  rating: number
  review: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: User
  date: string
  imageUrl: string
  category: string
  readTime: string
}
