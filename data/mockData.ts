import { Recipe, MealPlan, User, OnboardingSlide } from '@/types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Avocado Toast with Poached Egg',
    description: 'A healthy and delicious breakfast that takes only 10 minutes to prepare',
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400',
    cookingTime: 10,
    difficulty: 'Easy',
    servings: 1,
    category: 'breakfast',
    tags: ['healthy', 'quick', 'vegetarian', 'protein'],
    rating: 4.8,
    reviewCount: 234,
    calories: 320,
    ingredients: [
      { id: '1', name: 'Whole grain bread', amount: '2', unit: 'slices' },
      { id: '2', name: 'Ripe avocado', amount: '1', unit: 'medium' },
      { id: '3', name: 'Eggs', amount: '2', unit: 'large' },
      { id: '4', name: 'Lemon juice', amount: '1', unit: 'tbsp' },
      { id: '5', name: 'Salt', amount: '1/4', unit: 'tsp' },
      { id: '6', name: 'Black pepper', amount: '1/4', unit: 'tsp' },
      { id: '7', name: 'Red pepper flakes', amount: '1/4', unit: 'tsp', optional: true }
    ],
    instructions: [
      {
        id: '1',
        step: 1,
        title: 'Toast the bread',
        description: 'Toast the bread slices until golden brown and crispy.',
        timer: 3
      },
      {
        id: '2',
        step: 2,
        title: 'Prepare avocado',
        description: 'Mash the avocado with lemon juice, salt, and pepper in a bowl.',
        timer: 2
      },
      {
        id: '3',
        step: 3,
        title: 'Poach the eggs',
        description: 'Bring water to a gentle simmer, create a whirlpool, and drop in the eggs. Cook for 3-4 minutes.',
        timer: 4
      },
      {
        id: '4',
        step: 4,
        title: 'Assemble',
        description: 'Spread avocado mixture on toast, top with poached eggs, and sprinkle with red pepper flakes.',
        timer: 1
      }
    ],
    nutritionFacts: {
      calories: 320,
      protein: 18,
      carbs: 28,
      fat: 16,
      fiber: 12,
      sugar: 3,
      sodium: 380
    },
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    isFavorite: false,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Mediterranean Quinoa Bowl',
    description: 'Fresh and nutritious bowl packed with Mediterranean flavors',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    cookingTime: 25,
    difficulty: 'Easy',
    servings: 2,
    category: 'lunch',
    tags: ['healthy', 'vegan', 'mediterranean', 'protein'],
    rating: 4.6,
    reviewCount: 189,
    calories: 420,
    ingredients: [
      { id: '1', name: 'Quinoa', amount: '1', unit: 'cup' },
      { id: '2', name: 'Cherry tomatoes', amount: '1', unit: 'cup' },
      { id: '3', name: 'Cucumber', amount: '1', unit: 'medium' },
      { id: '4', name: 'Red onion', amount: '1/4', unit: 'cup' },
      { id: '5', name: 'Kalamata olives', amount: '1/4', unit: 'cup' },
      { id: '6', name: 'Feta cheese', amount: '1/2', unit: 'cup' },
      { id: '7', name: 'Olive oil', amount: '3', unit: 'tbsp' },
      { id: '8', name: 'Lemon juice', amount: '2', unit: 'tbsp' }
    ],
    instructions: [
      {
        id: '1',
        step: 1,
        title: 'Cook quinoa',
        description: 'Rinse quinoa and cook in 2 cups of water for 15 minutes until fluffy.',
        timer: 15
      },
      {
        id: '2',
        step: 2,
        title: 'Prepare vegetables',
        description: 'Dice tomatoes, cucumber, and red onion. Crumble feta cheese.',
        timer: 5
      },
      {
        id: '3',
        step: 3,
        title: 'Make dressing',
        description: 'Whisk together olive oil, lemon juice, salt, and pepper.',
        timer: 2
      },
      {
        id: '4',
        step: 4,
        title: 'Assemble bowl',
        description: 'Combine quinoa with vegetables, olives, and feta. Drizzle with dressing.',
        timer: 3
      }
    ],
    nutritionFacts: {
      calories: 420,
      protein: 16,
      carbs: 52,
      fat: 18,
      fiber: 6,
      sugar: 8,
      sodium: 520
    },
    author: {
      name: 'Maria Rodriguez',
      avatar: 'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    isFavorite: true,
    createdAt: new Date('2024-01-14')
  },
  {
    id: '3',
    title: 'One-Pot Creamy Mushroom Pasta',
    description: 'Rich and creamy pasta dish that cooks in just one pot',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    cookingTime: 20,
    difficulty: 'Medium',
    servings: 4,
    category: 'dinner',
    tags: ['pasta', 'creamy', 'mushrooms', 'comfort-food'],
    rating: 4.9,
    reviewCount: 456,
    calories: 380,
    ingredients: [
      { id: '1', name: 'Penne pasta', amount: '12', unit: 'oz' },
      { id: '2', name: 'Mixed mushrooms', amount: '8', unit: 'oz' },
      { id: '3', name: 'Heavy cream', amount: '1', unit: 'cup' },
      { id: '4', name: 'Garlic', amount: '3', unit: 'cloves' },
      { id: '5', name: 'Onion', amount: '1', unit: 'medium' },
      { id: '6', name: 'Parmesan cheese', amount: '1/2', unit: 'cup' },
      { id: '7', name: 'Vegetable broth', amount: '2', unit: 'cups' },
      { id: '8', name: 'Fresh thyme', amount: '2', unit: 'tsp' }
    ],
    instructions: [
      {
        id: '1',
        step: 1,
        title: 'Sauté aromatics',
        description: 'Heat oil in a large pot. Sauté onion and garlic until fragrant.',
        timer: 3
      },
      {
        id: '2',
        step: 2,
        title: 'Cook mushrooms',
        description: 'Add mushrooms and cook until golden brown and moisture evaporates.',
        timer: 5
      },
      {
        id: '3',
        step: 3,
        title: 'Add pasta and liquid',
        description: 'Add pasta, broth, and cream. Bring to a boil, then simmer covered.',
        timer: 12
      },
      {
        id: '4',
        step: 4,
        title: 'Finish and serve',
        description: 'Stir in Parmesan and thyme. Season with salt and pepper.',
        timer: 2
      }
    ],
    nutritionFacts: {
      calories: 380,
      protein: 14,
      carbs: 48,
      fat: 16,
      fiber: 3,
      sugar: 6,
      sodium: 420
    },
    author: {
      name: 'Chef Antonio',
      avatar: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    isFavorite: false,
    createdAt: new Date('2024-01-13')
  }
];

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Thompson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=100',
  dietaryPreferences: ['vegetarian'],
  allergies: ['nuts'],
  cookingLevel: 'Intermediate',
  favoriteRecipes: ['2'],
  mealPlans: ['plan-1'],
  weeklyGoal: 5,
  preferences: {
    maxCookingTime: 30,
    preferredMealTypes: ['breakfast', 'lunch', 'dinner'],
    avoidIngredients: ['nuts', 'shellfish'],
    nutritionGoals: {
      dailyCalories: 2000,
      protein: 150,
      carbs: 200,
      fat: 70
    },
    notifications: {
      mealReminders: true,
      newRecipes: true,
      weeklyPlanning: true
    }
  },
  createdAt: new Date('2024-01-01')
};

export const mockMealPlans: MealPlan[] = [
  {
    id: 'plan-1',
    userId: 'user-1',
    name: 'Healthy Week',
    description: '7-day meal plan focused on nutritious, balanced meals',
    duration: 7,
    recipes: [
      { recipeId: '1', day: 1, mealType: 'breakfast', scheduled: true },
      { recipeId: '2', day: 1, mealType: 'lunch', scheduled: true },
      { recipeId: '3', day: 1, mealType: 'dinner', scheduled: false }
    ],
    totalCalories: 1800,
    dietType: 'vegetarian',
    createdAt: new Date('2024-01-10'),
    isActive: true
  }
];

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Discover Recipes',
    subtitle: 'Thousands of delicious recipes',
    description: 'Explore a vast collection of recipes from around the world, curated by professional chefs and home cooking enthusiasts.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    primaryColor: '#68B684'
  },
  {
    id: 2,
    title: 'Plan Your Meals',
    subtitle: 'Smart meal planning made easy',
    description: 'Create personalized meal plans that fit your schedule, dietary preferences, and nutritional goals.',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    primaryColor: '#3A86FF'
  },
  {
    id: 3,
    title: 'Personalize Your Diet',
    subtitle: 'Tailored to your lifestyle',
    description: 'Get AI-powered recommendations based on your preferences, allergies, and cooking skill level.',
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400',
    primaryColor: '#FF6B6B'
  }
];

export const trendingCategories = [
  { id: 'vegan', name: 'Vegan', emoji: '🌱', color: '#68B684' },
  { id: 'keto', name: 'Keto', emoji: '🥑', color: '#3A86FF' },
  { id: 'under-10', name: 'Under 10 mins', emoji: '⚡', color: '#FF6B6B' },
  { id: 'high-protein', name: 'High Protein', emoji: '💪', color: '#FBBF24' },
  { id: 'gluten-free', name: 'Gluten Free', emoji: '🌾', color: '#8B5CF6' },
  { id: 'comfort-food', name: 'Comfort Food', emoji: '🍲', color: '#F59E0B' }
];