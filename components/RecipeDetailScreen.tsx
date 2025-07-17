import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Clock, Users, Star, Heart, Play, ShoppingCart, Timer } from 'lucide-react-native';
import { Recipe } from '@/types';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  onStartCooking: () => void;
}

export function RecipeDetailScreen({ recipe, onBack, onStartCooking }: RecipeDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Heart 
              size={24} 
              color={isFavorite ? '#FF6B6B' : '#FFFFFF'} 
              fill={isFavorite ? '#FF6B6B' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Recipe Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.description}>{recipe.description}</Text>
            
            <View style={styles.metadata}>
              <View style={styles.metaItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.metaText}>{recipe.cookingTime} mins</Text>
              </View>
              
              <View style={styles.metaItem}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.metaText}>{recipe.servings} servings</Text>
              </View>
              
              <View style={styles.metaItem}>
                <Star size={16} color="#FBBF24" fill="#FBBF24" />
                <Text style={styles.metaText}>{recipe.rating} ({recipe.reviewCount})</Text>
              </View>
            </View>
            
            <View style={styles.authorSection}>
              <Image source={{ uri: recipe.author.avatar }} style={styles.authorAvatar} />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{recipe.author.name}</Text>
                <Text style={styles.authorLabel}>Recipe by</Text>
              </View>
              {recipe.author.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            {(['ingredients', 'instructions', 'nutrition'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          {activeTab === 'ingredients' && (
            <View style={styles.tabContent}>
              {recipe.ingredients.map((ingredient) => (
                <View key={ingredient.id} style={styles.ingredientItem}>
                  <View style={styles.ingredientAmount}>
                    <Text style={styles.amountText}>{ingredient.amount}</Text>
                    <Text style={styles.unitText}>{ingredient.unit}</Text>
                  </View>
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                  {ingredient.optional && (
                    <Text style={styles.optionalText}>Optional</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {activeTab === 'instructions' && (
            <View style={styles.tabContent}>
              {recipe.instructions.map((instruction) => (
                <View key={instruction.id} style={styles.instructionItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepText}>{instruction.step}</Text>
                  </View>
                  <View style={styles.instructionContent}>
                    <Text style={styles.instructionTitle}>{instruction.title}</Text>
                    <Text style={styles.instructionDescription}>{instruction.description}</Text>
                    {instruction.timer && (
                      <View style={styles.timerContainer}>
                        <Timer size={14} color="#68B684" />
                        <Text style={styles.timerText}>{instruction.timer} minutes</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'nutrition' && (
            <View style={styles.tabContent}>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{recipe.nutritionFacts.calories}</Text>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{recipe.nutritionFacts.protein}g</Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{recipe.nutritionFacts.carbs}g</Text>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{recipe.nutritionFacts.fat}g</Text>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{recipe.nutritionFacts.fiber}g</Text>
                  <Text style={styles.nutritionLabel}>Fiber</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{recipe.nutritionFacts.sodium}mg</Text>
                  <Text style={styles.nutritionLabel}>Sodium</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.shoppingButton}>
          <ShoppingCart size={20} color="#6B7280" />
          <Text style={styles.shoppingButtonText}>Add to List</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cookButton} onPress={onStartCooking}>
          <Play size={20} color="#FFFFFF" />
          <Text style={styles.cookButtonText}>Start Cooking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 24,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  authorLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#68B684',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#68B684',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#68B684',
    fontWeight: '600',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  ingredientAmount: {
    width: 80,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  unitText: {
    fontSize: 12,
    color: '#6B7280',
  },
  ingredientName: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 16,
  },
  optionalText: {
    fontSize: 12,
    color: '#68B684',
    fontStyle: 'italic',
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#68B684',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  instructionDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 8,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerText: {
    fontSize: 14,
    color: '#68B684',
    fontWeight: '500',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  nutritionItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#FDFDFD',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    gap: 12,
  },
  shoppingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    gap: 8,
  },
  shoppingButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  cookButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#68B684',
    gap: 8,
    shadowColor: '#68B684',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cookButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});