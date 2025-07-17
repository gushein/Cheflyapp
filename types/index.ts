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