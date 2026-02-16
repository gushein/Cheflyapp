const baseTranslations = {
  // Navigation
  bookChef: 'Book Chef',
  chefPanel: 'Chef Panel',
  admin: 'Admin',

  // User Panel
  findYourChef: 'Find Your Chef',
  downtownArea: 'Downtown Area',
  searchChefs: 'Search chefs or cuisine...',
  mealTypes: 'Meal Types',
  availableChefs: 'Available Chefs',
  recentBookings: 'Recent Bookings',
  noBookingsYet: 'No bookings yet',
  bookFirstChef: 'Book your first chef to get started!',

  // Meal Types
  homeStyle: 'Home Style',
  dietFriendly: 'Diet Friendly',
  fastFood: 'Fast Food',
  gourmet: 'Gourmet',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',

  // Chef Panel
  chefDashboard: 'Chef Dashboard',
  welcomeBack: 'Welcome back',
  availabilityStatus: 'Availability Status',
  availableForBookings: 'Available for bookings',
  currentlyUnavailable: 'Currently unavailable',
  totalBookings: 'Total Bookings',
  completed: 'Completed',
  totalEarnings: 'Total Earnings',
  avgRating: 'Avg Rating',
  pendingBookings: 'Pending Bookings',
  noPendingBookings: 'No pending bookings',
  newBookingRequests: 'New booking requests will appear here',
  upcomingBookings: 'Upcoming Bookings',
  recentReviews: 'Recent Reviews',
  accept: 'Accept',
  reject: 'Reject',

  // Admin Panel
  adminDashboard: 'Admin Dashboard',
  chefConnectManagement: 'ChefConnect Management',
  totalUsers: 'Total Users',
  activeChefs: 'Active Chefs',
  revenue: 'Revenue',
  systemAlerts: 'System Alerts',
  recentActivity: 'Recent Activity',
  chefManagement: 'Chef Management',
  paymentAnalytics: 'Payment Analytics',
  verified: 'Verified',
  pending: 'Pending',
  manage: 'Manage',

  // Loyalty & Rewards
  loyaltyPoints: 'Loyalty Points',
  availableRewards: 'Available Rewards',
  redeemReward: 'Redeem',
  pointsRequired: 'points required',

  // Subscriptions
  subscriptionPlans: 'Subscription Plans',
  sessionsRemaining: 'sessions remaining',
  renewSubscription: 'Renew Subscription',

  // AI Suggestions
  aiSuggestions: 'AI Menu Suggestions',
  basedOnPreferences: 'Based on your preferences',
  cookingTime: 'Cooking Time',
  difficulty: 'Difficulty',
  matchScore: 'Match Score',

  // Tracking
  chefLocation: 'Chef Location',
  estimatedArrival: 'Estimated Arrival',
  trackingEnabled: 'Live tracking enabled',

  // Common
  book: 'Book',
  cancel: 'Cancel',
  confirm: 'Confirm',
  save: 'Save',
  edit: 'Edit',
  delete: 'Delete',
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  yearsExperience: 'years experience',
  available: 'Available',
  busy: 'Busy',
  reviews: 'reviews',

  // Status
  confirmed: 'Confirmed',
  chefEnRoute: 'Chef En Route',
  chefArrived: 'Chef Arrived',
  cooking: 'Cooking',
  cancelled: 'Cancelled'
};

export const translations = {
  en: baseTranslations,
  az: {
    ...baseTranslations,
    bookChef: 'Aşpaz Sifariş Et',
    chefPanel: 'Aşpaz Paneli',
    findYourChef: 'Aşpazınızı Tapın',
    searchChefs: 'Aşpaz və ya mətbəx axtarın...',
    recentBookings: 'Son Sifarişlər',
    adminDashboard: 'Admin Paneli',
    chefManagement: 'Aşpaz İdarəetməsi',
    paymentAnalytics: 'Ödəniş Analitikası',
    welcomeBack: 'Xoş gəlmisiniz',
    noBookingsYet: 'Hələ sifariş yoxdur',
    success: 'Uğur',
    error: 'Xəta'
  },
  ru: {
    ...baseTranslations,
    bookChef: 'Заказать Повара',
    chefPanel: 'Панель Повара',
    findYourChef: 'Найдите Своего Повара',
    searchChefs: 'Поиск поваров или кухни...',
    recentBookings: 'Недавние Заказы',
    adminDashboard: 'Панель Администратора',
    chefManagement: 'Управление Поварами',
    paymentAnalytics: 'Аналитика Платежей',
    welcomeBack: 'Добро пожаловать',
    noBookingsYet: 'Пока нет заказов',
    success: 'Успех',
    error: 'Ошибка'
  }
};

export function useTranslation(language: 'en' | 'az' | 'ru' = 'en') {
  return translations[language];
}
