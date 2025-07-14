import { Chef, User, Booking, Review, Subscription, LoyaltyReward, AIMenuSuggestion, Notification, Invoice } from '@/types';

export const mockChefs: Chef[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    phone: '+1 (555) 123-4567',
    profileImage: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Passionate about authentic Mexican cuisine with 10 years of experience in fine dining.',
    specialties: ['Mexican', 'Latin American', 'Vegetarian'],
    rating: 4.8,
    reviewCount: 127,
    priceRange: '$80-120/hour',
    location: 'Downtown Area',
    availability: [
      { date: '2024-01-15', startTime: '18:00', endTime: '22:00', isBooked: false },
      { date: '2024-01-16', startTime: '17:00', endTime: '21:00', isBooked: false }
    ],
    isAvailable: true,
    experienceYears: 10,
    verified: true,
    backgroundChecked: true,
    badges: [
      { id: '1', name: 'Master Chef', icon: '👨‍🍳', description: 'Completed advanced culinary training', earnedAt: new Date('2023-01-01') },
      { id: '2', name: 'Health Expert', icon: '🥗', description: 'Specialized in healthy cooking', earnedAt: new Date('2023-06-01') }
    ],
    languages: ['en', 'az'],
    bringsIngredients: true,
    offersCleanup: true,
    cleanupPrice: 25,
    liveStreamingEnabled: true,
    socialMediaLinks: {
      instagram: '@mariachef',
      tiktok: '@mariarodriguez'
    },
    currentLocation: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'En route to customer'
    },
    userRating: 4.9
  },
  {
    id: '2',
    name: 'James Chen',
    email: 'james@example.com',
    phone: '+1 (555) 234-5678',
    profileImage: 'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specializing in Asian fusion and healthy meal prep with modern techniques.',
    specialties: ['Asian Fusion', 'Healthy', 'Gluten-Free'],
    rating: 4.9,
    reviewCount: 89,
    priceRange: '$90-130/hour',
    location: 'Uptown District',
    availability: [
      { date: '2024-01-15', startTime: '19:00', endTime: '23:00', isBooked: false }
    ],
    isAvailable: true,
    experienceYears: 8,
    verified: true,
    backgroundChecked: true,
    badges: [
      { id: '3', name: 'Innovation Award', icon: '🏆', description: 'Creative cooking techniques', earnedAt: new Date('2023-03-01') }
    ],
    languages: ['en', 'ru'],
    bringsIngredients: true,
    offersCleanup: false,
    cleanupPrice: 0,
    liveStreamingEnabled: false,
    socialMediaLinks: {
      youtube: 'JamesChenCooks'
    },
    userRating: 4.7
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie@example.com',
    phone: '+1 (555) 345-6789',
    profileImage: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'French culinary trained chef specializing in classical French cuisine and pastries.',
    specialties: ['French', 'Pastries', 'Fine Dining'],
    rating: 4.7,
    reviewCount: 156,
    priceRange: '$100-150/hour',
    location: 'Midtown',
    availability: [
      { date: '2024-01-16', startTime: '18:30', endTime: '22:30', isBooked: false }
    ],
    isAvailable: true,
    experienceYears: 12,
    verified: true,
    backgroundChecked: true,
    badges: [
      { id: '4', name: 'Pastry Expert', icon: '🧁', description: 'Master of French pastries', earnedAt: new Date('2022-12-01') }
    ],
    languages: ['en', 'ru'],
    bringsIngredients: false,
    offersCleanup: true,
    cleanupPrice: 30,
    liveStreamingEnabled: true,
    socialMediaLinks: {
      instagram: '@sophielaurent',
      facebook: 'SophieLaurentChef'
    },
    userRating: 4.8
  }
];

export const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 987-6543',
  address: '123 Main St, City, State 12345',
  userType: 'user',
  createdAt: new Date('2024-01-01'),
  loyaltyPoints: 250,
  totalBookings: 5,
  preferredLanguage: 'en',
  dietaryPreferences: ['vegetarian', 'gluten-free'],
  allergens: ['nuts', 'shellfish'],
  kitchenRating: 4.5,
  behaviorRating: 4.8,
  corporateAccount: false,
  subscriptions: []
};

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    userId: 'user-1',
    type: 'basic-10',
    sessionsTotal: 10,
    sessionsUsed: 3,
    discount: 15,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-04-01'),
    isActive: true,
    price: 680
  }
];

export const mockLoyaltyRewards: LoyaltyReward[] = [
  {
    id: 'reward-1',
    name: '10% Off Next Booking',
    description: 'Get 10% discount on your next chef booking',
    pointsRequired: 100,
    discountPercentage: 10,
    type: 'discount',
    isActive: true
  },
  {
    id: 'reward-2',
    name: 'Free Cleanup Service',
    description: 'Complimentary post-cooking cleanup',
    pointsRequired: 200,
    discountPercentage: 0,
    type: 'upgrade',
    isActive: true
  },
  {
    id: 'reward-3',
    name: 'Free Cooking Session',
    description: 'One complimentary 2-hour cooking session',
    pointsRequired: 500,
    discountPercentage: 100,
    type: 'free-session',
    isActive: true
  }
];

export const mockAISuggestions: AIMenuSuggestion[] = [
  {
    id: 'ai-1',
    userId: 'user-1',
    mealType: 'diet-friendly',
    cuisineType: 'Mediterranean',
    ingredients: ['quinoa', 'grilled chicken', 'vegetables', 'olive oil'],
    nutritionalInfo: {
      calories: 450,
      protein: 35,
      carbs: 40,
      fat: 18,
      fiber: 8
    },
    estimatedCookingTime: 45,
    difficulty: 'medium',
    matchScore: 95,
    reason: 'Based on your vegetarian preference and gluten-free diet'
  },
  {
    id: 'ai-2',
    userId: 'user-1',
    mealType: 'home-style',
    cuisineType: 'Italian',
    ingredients: ['gluten-free pasta', 'tomatoes', 'basil', 'mozzarella'],
    nutritionalInfo: {
      calories: 520,
      protein: 22,
      carbs: 65,
      fat: 16,
      fiber: 4
    },
    estimatedCookingTime: 30,
    difficulty: 'easy',
    matchScore: 88,
    reason: 'Comfort food that matches your dietary restrictions'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'chef-en-route',
    title: 'Chef is on the way!',
    message: 'Maria Rodriguez is heading to your location. ETA: 15 minutes',
    isRead: false,
    createdAt: new Date(),
    data: { chefId: '1', eta: '15 minutes' }
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'loyalty-reward',
    title: 'Loyalty Points Earned!',
    message: 'You earned 50 points from your last booking. Total: 250 points',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000),
    data: { pointsEarned: 50, totalPoints: 250 }
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    userId: 'user-1',
    chefId: '1',
    mealType: 'home-style',
    date: '2024-01-15',
    time: '18:00',
    duration: 3,
    totalPrice: 240,
    status: 'chef-en-route',
    address: '123 Main St, City, State 12345',
    createdAt: new Date('2024-01-10'),
    ingredientOption: 'chef-brings',
    cleanupRequested: true,
    cleanupPrice: 25,
    trackingEnabled: true,
    chefLocation: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'En route'
    },
    estimatedArrival: '18:15',
    loyaltyPointsEarned: 50,
    loyaltyPointsUsed: 0,
    subscriptionId: 'sub-1',
    aiSuggested: true,
    invoiceGenerated: false
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    bookingId: 'booking-1',
    userId: 'user-1',
    chefId: '1',
    invoiceNumber: 'INV-2024-001',
    issueDate: new Date('2024-01-15'),
    dueDate: new Date('2024-01-30'),
    subtotal: 240,
    tax: 24,
    total: 264,
    status: 'pending'
  },
  {
    id: 'inv-2',
    bookingId: 'booking-2',
    userId: 'user-1',
    chefId: '2',
    invoiceNumber: 'INV-2024-002',
    issueDate: new Date('2024-01-10'),
    dueDate: new Date('2024-01-25'),
    subtotal: 180,
    tax: 18,
    total: 198,
    status: 'paid',
    corporateDetails: {
      companyName: 'Tech Corp Inc.',
      taxId: 'TC123456789',
      billingAddress: '456 Business Ave, Corporate City, CC 54321',
      contactPerson: 'Jane Smith',
      department: 'HR'
    }
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    bookingId: 'booking-1',
    userId: 'user-1',
    chefId: '1',
    rating: 5,
    comment: 'Amazing experience! Maria prepared the most delicious authentic Mexican meal.',
    createdAt: new Date('2024-01-16'),
    type: 'user-to-chef',
    categories: {
      foodQuality: 5,
      punctuality: 5,
      professionalism: 5,
      cleanliness: 4,
      communication: 5
    }
  },
  {
    id: 'review-2',
    bookingId: 'booking-1',
    userId: 'user-1',
    chefId: '1',
    rating: 5,
    comment: 'Great customer! Clean kitchen, friendly, and clear instructions.',
    createdAt: new Date('2024-01-16'),
    type: 'chef-to-user',
    categories: {
      kitchenCondition: 5,
      behavior: 5,
      communication: 5
    }
  }
];