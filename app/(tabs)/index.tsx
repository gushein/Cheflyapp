import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, User, TrendingUp } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeDetailScreen } from '@/components/RecipeDetailScreen';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { mockRecipes, mockUser, trendingCategories } from '@/data/mockData';
import { Recipe } from '@/types';

export default function HomeScreen() {
  const { state, dispatch } = useApp();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Initialize app data
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
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleStartCooking = () => {
    // Navigate to cooking mode
    console.log('Starting cooking mode for:', selectedRecipe?.title);
    setSelectedRecipe(null);
  };

  const handleFilter = () => {
    // Show filter modal
    console.log('Show filter modal');
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
  }

  if (selectedRecipe) {
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{state.currentUser?.name || 'Chef'}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#1A1A1A" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <User size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.subtitle}>What would you like to cook today?</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilter={handleFilter}
          placeholder="Search recipes, ingredients..."
        />

        {/* Trending Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#68B684" />
            <Text style={styles.sectionTitle}>Trending Categories</Text>
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
            <Text style={styles.sectionTitle}>Featured Recipe</Text>
            <RecipeCard
              recipe={filteredRecipes[0]}
              onPress={() => handleRecipeSelect(filteredRecipes[0])}
              variant="featured"
            />
          </View>
        )}

        {/* Quick & Easy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick & Easy (Under 15 mins)</Text>
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
          <Text style={styles.sectionTitle}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FDFDFD',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
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
    backgroundColor: '#F5F5F5',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
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
    backgroundColor: '#F5F5F5',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
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
    color: '#1A1A1A',
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