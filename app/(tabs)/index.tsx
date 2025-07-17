import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, User, TrendingUp, Search } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeDetailScreen } from '@/components/RecipeDetailScreen';
import { CookingModeScreen } from '@/components/CookingModeScreen';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { SmartIngredientFilter } from '@/components/SmartIngredientFilter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ToastNotification } from '@/components/ToastNotification';
import { GamificationBadges } from '@/components/GamificationBadges';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { mockRecipes, mockUser, trendingCategories } from '@/data/mockData';
import { Recipe } from '@/types';

export default function HomeScreen() {
  const { state, dispatch } = useApp();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showCookingMode, setShowCookingMode] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; visible: boolean }>({
    message: '',
    type: 'info',
    visible: false,
  });

  const mockBadges = [
    { id: '1', name: 'First Recipe', description: 'Cooked your first recipe', icon: 'star' as const, color: '#68B684', isUnlocked: true },
    { id: '2', name: 'Speed Chef', description: 'Completed 5 quick recipes', icon: 'zap' as const, color: '#F6AD55', isUnlocked: false, progress: 60 },
    { id: '3', name: 'Master Chef', description: 'Cooked 50 recipes', icon: 'trophy' as const, color: '#4299E1', isUnlocked: false, progress: 20 },
    { id: '4', name: 'Healthy Eater', description: 'Completed 10 healthy recipes', icon: 'target' as const, color: '#48BB78', isUnlocked: true },
  ];

  useEffect(() => {
    dispatch({ type: 'SET_USER', payload: mockUser });
    setFilteredRecipes(mockRecipes);
  }, [dispatch]);

  useEffect(() => {
    let filtered = mockRecipes;
    
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(recipe =>
        recipe.tags.includes(selectedCategory) ||
        recipe.category === selectedCategory
      );
    }
    
    setFilteredRecipes(filtered);
  }, [searchQuery, selectedCategory]);

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    showToast('Welcome to Chefly! Start exploring recipes.', 'success');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleStartCooking = () => {
    setShowCookingMode(true);
    showToast('Cooking mode activated!', 'info');
  };

  const handleFilter = () => {
    console.log('Show filter modal');
  };

  const handleFiltersChange = (filters: string[]) => {
    console.log('Filters changed:', filters);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
  }

  if (showCookingMode && selectedRecipe) {
    return (
      <CookingModeScreen
        recipe={selectedRecipe}
        onBack={() => {
          setShowCookingMode(false);
          showToast('Cooking session saved!', 'success');
        }}
      />
    );
  }

  if (selectedRecipe && !showCookingMode) {
    return (
      <RecipeDetailScreen
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
        onStartCooking={handleStartCooking}
      />
    );
  }

  if (state.loading) {
    return <LoadingSpinner />;
  }

  const containerStyle = [
    styles.container,
    isDarkMode && styles.darkContainer
  ];

  const headerStyle = [
    styles.header,
    isDarkMode && styles.darkHeader
  ];

  return (
    <View style={containerStyle}>
      {/* Toast Notification */}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onDismiss={hideToast}
      />

      {/* Header */}
      <View style={headerStyle}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.greeting, isDarkMode && styles.darkText]}>Good morning,</Text>
            <Text style={[styles.userName, isDarkMode && styles.darkText]}>
              {state.currentUser?.name || 'Chef'}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <ThemeToggle onThemeChange={setIsDarkMode} />
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color={isDarkMode ? '#FFFFFF' : '#2D3748'} />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <User size={24} color={isDarkMode ? '#FFFFFF' : '#2D3748'} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
          What would you like to cook today?
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Enhanced Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilter={handleFilter}
            placeholder="Search recipes, ingredients..."
          />
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={() => setShowVoiceAssistant(!showVoiceAssistant)}
          >
            <Search size={20} color="#68B684" />
          </TouchableOpacity>
        </View>

        {/* Smart Ingredient Filter */}
        <SmartIngredientFilter onFiltersChange={handleFiltersChange} />

        {/* Gamification Badges */}
        <GamificationBadges badges={mockBadges} newlyUnlocked={['4']} />

        {/* Trending Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#68B684" />
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Trending Categories
            </Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {trendingCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategorySelect(category.id)}
                isSelected={selectedCategory === category.id}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Recipe */}
        {filteredRecipes.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Featured Recipe
            </Text>
            <RecipeCard
              recipe={filteredRecipes[0]}
              onPress={() => handleRecipeSelect(filteredRecipes[0])}
              variant="featured"
            />
          </View>
        )}

        {/* Quick & Easy */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Quick & Easy (Under 15 mins)
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipesScroll}>
            {filteredRecipes
              .filter(recipe => recipe.cookingTime <= 15)
              .map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onPress={() => handleRecipeSelect(recipe)}
                  variant="compact"
                />
              ))}
          </ScrollView>
        </View>

        {/* All Recipes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            {selectedCategory ? `${selectedCategory} Recipes` : 'All Recipes'} ({filteredRecipes.length})
          </Text>
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={() => handleRecipeSelect(recipe)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Voice Assistant */}
      <VoiceAssistant 
        isVisible={showVoiceAssistant} 
        onToggle={() => setShowVoiceAssistant(!showVoiceAssistant)} 
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        onAddRecipe={() => showToast('Add Recipe feature coming soon!', 'info')}
        onAddMealPlan={() => showToast('Meal plan added!', 'success')}
        onAddToCart={() => showToast('Added to shopping cart!', 'success')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  darkContainer: {
    backgroundColor: '#1A202C',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FEFEFE',
  },
  darkHeader: {
    backgroundColor: '#2D3748',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 16,
    color: '#68B684',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
  },
  darkText: {
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F56565',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  profileButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
  },
  subtitle: {
    fontSize: 16,
    color: '#68B684',
    marginTop: 4,
  },
  darkSubtitle: {
    color: '#A0AEC0',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  recipesScroll: {
    paddingLeft: 20,
  },
});