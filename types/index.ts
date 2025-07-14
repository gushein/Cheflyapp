export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
  userType: 'user' | 'chef' | 'admin';
  createdAt: Date;
  loyaltyPoints: number;
  totalBookings: number;
  preferredLanguage: 'en' | 'az' | 'ru';
  dietaryPreferences: string[];
  allergens: string[];
  kitchenRating?: number;
  behaviorRating?: number;
  corporateAccount?: boolean;
  subscriptions: Subscription[];
}

export interface Chef {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  bio: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  priceRange: string;
  location: string;
  availability: TimeSlot[];
  isAvailable: boolean;
  experienceYears: number;
  verified: boolean;
  backgroundChecked: boolean;
  badges: ChefBadge[];
  languages: ('en' | 'az' | 'ru')[];
  bringsIngredients: boolean;
  offersCleanup: boolean;
  cleanupPrice: number;
  liveStreamingEnabled: boolean;
  socialMediaLinks: SocialMediaLinks;
  currentLocation?: Location;
  userRating?: number; // Chef's rating of users
}

export interface ChefBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
}

export interface SocialMediaLinks {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  facebook?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  chefId: string;
  mealType: MealType;
  date: string;
  time: string;
  duration: number;
  totalPrice: number;
  status: BookingStatus;
  specialRequests?: string;
  address: string;
  createdAt: Date;
  ingredientOption: 'chef-brings' | 'use-home' | 'mixed';
  cleanupRequested: boolean;
  cleanupPrice: number;
  trackingEnabled: boolean;
  chefLocation?: Location;
  estimatedArrival?: string;
  loyaltyPointsEarned: number;
  loyaltyPointsUsed: number;
  subscriptionId?: string;
  aiSuggested: boolean;
  invoiceGenerated: boolean;
  invoiceNumber?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  type: SubscriptionType;
  sessionsTotal: number;
  sessionsUsed: number;
  discount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  price: number;
}

export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  chefId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  type: 'user-to-chef' | 'chef-to-user';
  categories?: ReviewCategories;
}

export interface ReviewCategories {
  foodQuality?: number;
  punctuality?: number;
  professionalism?: number;
  cleanliness?: number;
  communication?: number;
  kitchenCondition?: number; // For chef-to-user reviews
  behavior?: number; // For chef-to-user reviews
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  discountPercentage: number;
  type: 'discount' | 'free-session' | 'upgrade';
  isActive: boolean;
}

export interface AIMenuSuggestion {
  id: string;
  userId: string;
  mealType: MealType;
  cuisineType: string;
  ingredients: string[];
  nutritionalInfo: NutritionalInfo;
  estimatedCookingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  matchScore: number;
  reason: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Invoice {
  id: string;
  bookingId: string;
  userId: string;
  chefId: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'paid' | 'overdue';
  corporateDetails?: CorporateDetails;
}

export interface CorporateDetails {
  companyName: string;
  taxId: string;
  billingAddress: string;
  contactPerson: string;
  department: string;
}

export type MealType = 'home-style' | 'diet-friendly' | 'fast-food' | 'gourmet' | 'vegetarian' | 'vegan' | 'keto' | 'mediterranean' | 'asian-fusion';

export type SubscriptionType = 'basic-10' | 'premium-20' | 'daily-lunch' | 'weekly-dinner' | 'diet-plan';

export type BookingStatus = 'pending' | 'confirmed' | 'chef-en-route' | 'chef-arrived' | 'cooking' | 'completed' | 'cancelled';

export interface PaymentDetails {
  amount: number;
  currency: string;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  loyaltyPointsUsed?: number;
  subscriptionDiscount?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking-confirmed' | 'chef-en-route' | 'chef-arrived' | 'cooking-started' | 'meal-ready' | 'loyalty-reward' | 'subscription-reminder';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  data?: any;
}

export interface Language {
  code: 'en' | 'az' | 'ru';
  name: string;
  flag: string;
}