export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  calories: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutritionFacts: NutritionFacts;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  isFavorite: boolean;
  createdAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  optional?: boolean;
}

export interface Instruction {
  id: string;
  step: number;
  title: string;
  description: string;
  image?: string;
  timer?: number;
  temperature?: string;
}

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'chef-en-route'
  | 'chef-arrived'
  | 'cooking'
  | 'completed'
  | 'cancelled';

export interface ChefLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface Chef {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  rating: number;
  reviewCount: number;
  location: string;
  priceRange: string;
  experienceYears: number;
  specialties: string[];
  verified: boolean;
  isAvailable: boolean;
  liveStreamingEnabled: boolean;
  currentLocation?: ChefLocation;
}

export interface Booking {
  id: string;
  userId: string;
  chefId: string;
  date: Date;
  time: Date;
  duration: number;
  address: string;
  mealType: string;
  totalPrice: number;
  status: BookingStatus;
  trackingEnabled?: boolean;
  chefLocation?: ChefLocation;
  estimatedArrival?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  chefId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  type: 'basic-10' | 'premium-20' | 'daily-lunch' | 'weekly-dinner' | 'diet-plan';
  sessionsTotal: number;
  sessionsUsed: number;
  discount: number;
  price: number;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  discountPercentage: number;
  type: 'discount' | 'upgrade' | 'free-session';
  isActive: boolean;
}

export interface AIMenuSuggestion {
  id: string;
  cuisineType: string;
  mealType: string;
  ingredients: string[];
  matchScore: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedCookingTime: number;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  reason: string;
}

export interface Notification {
  id: string;
  userId: string;
  type:
    | 'booking-confirmed'
    | 'chef-en-route'
    | 'chef-arrived'
    | 'cooking-started'
    | 'meal-ready'
    | 'loyalty-reward'
    | 'subscription-reminder';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  data?: Record<string, string | number | boolean>;
}

export interface Invoice {
  id: string;
  bookingId: string;
  chefId: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  duration: number; // days
  recipes: MealPlanRecipe[];
  totalCalories: number;
  dietType: DietType;
  createdAt: Date;
  isActive: boolean;
}

export interface MealPlanRecipe {
  recipeId: string;
  day: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  scheduled: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  dietaryPreferences: DietType[];
  allergies: string[];
  cookingLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  favoriteRecipes: string[];
  mealPlans: string[];
  weeklyGoal: number; // meals to cook per week
  loyaltyPoints?: number;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  maxCookingTime: number;
  preferredMealTypes: string[];
  avoidIngredients: string[];
  nutritionGoals: {
    dailyCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  notifications: {
    mealReminders: boolean;
    newRecipes: boolean;
    weeklyPlanning: boolean;
  };
}

export interface ShoppingList {
  id: string;
  userId: string;
  name: string;
  items: ShoppingItem[];
  recipeIds: string[];
  completed: boolean;
  createdAt: Date;
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
  category: string;
  purchased: boolean;
  recipeId?: string;
}

export interface CookingSession {
  id: string;
  userId: string;
  recipeId: string;
  startTime: Date;
  currentStep: number;
  timers: Timer[];
  notes: string[];
  completed: boolean;
  rating?: number;
  review?: string;
}

export interface Timer {
  id: string;
  name: string;
  duration: number;
  startTime: Date;
  isActive: boolean;
}

export type DietType = 'none' | 'vegetarian' | 'vegan' | 'keto' | 'paleo' | 'mediterranean' | 'low-carb' | 'gluten-free' | 'dairy-free';

export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'desserts' | 'drinks' | 'appetizers' | 'salads' | 'soups';

export interface SearchFilters {
  category?: RecipeCategory;
  dietType?: DietType;
  maxCookingTime?: number;
  difficulty?: string;
  maxCalories?: number;
  ingredients?: string[];
}

export interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryColor: string;
}
