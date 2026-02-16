import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeDetailScreen } from '@/components/RecipeDetailScreen';
import { mockRecipes, trendingCategories } from '@/data/mockData';
import { Recipe } from '@/types';

export default function RecipesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleFilter = () => {
    console.log('Show filter modal');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory((currentCategory) => (currentCategory === categoryId ? null : categoryId));
  };

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return mockRecipes.filter((recipe) => {
      const matchesCategory =
        !selectedCategory || recipe.tags.includes(selectedCategory) || recipe.category === selectedCategory;

      const matchesSearch =
        normalizedQuery.length === 0 ||
        recipe.title.toLowerCase().includes(normalizedQuery) ||
        recipe.description.toLowerCase().includes(normalizedQuery) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const selectedCategoryName =
    trendingCategories.find((category) => category.id === selectedCategory)?.name ?? selectedCategory;

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleStartCooking = () => {
    console.log('Starting cooking mode for:', selectedRecipe?.title);
    setSelectedRecipe(null);
  };

  if (selectedRecipe) {
    return (
      <RecipeDetailScreen
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
        onStartCooking={handleStartCooking}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipes</Text>
        <Text style={styles.subtitle}>Discover delicious recipes for every occasion</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilter={handleFilter}
          placeholder="Search recipes..."
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategoryName ? `${selectedCategoryName} Recipes` : 'All Recipes'} ({filteredRecipes.length})
          </Text>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() => handleRecipeSelect(recipe)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No recipes found</Text>
              <Text style={styles.emptyStateDescription}>
                Try changing search text or selecting another category.
              </Text>
            </View>
          )}
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
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
  emptyState: {
    marginHorizontal: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6B7280',
  },
});
