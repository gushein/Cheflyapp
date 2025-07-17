import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, Users, Star, Heart } from 'lucide-react-native';
import { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  onFavorite?: () => void;
  variant?: 'default' | 'featured' | 'compact';
}

export function RecipeCard({ recipe, onPress, onFavorite, variant = 'default' }: RecipeCardProps) {
  const cardStyle = variant === 'featured' ? styles.featuredCard : 
                   variant === 'compact' ? styles.compactCard : styles.card;

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        
        {onFavorite && (
          <TouchableOpacity style={styles.favoriteButton} onPress={onFavorite}>
            <Heart 
              size={20} 
              color={recipe.isFavorite ? '#FF6B6B' : '#FFFFFF'} 
              fill={recipe.isFavorite ? '#FF6B6B' : 'transparent'}
            />
          </TouchableOpacity>
        )}
        
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{recipe.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{recipe.description}</Text>
        
        <View style={styles.metadata}>
          <View style={styles.metaItem}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.metaText}>{recipe.cookingTime}m</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Users size={14} color="#6B7280" />
            <Text style={styles.metaText}>{recipe.servings}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Star size={14} color="#FBBF24" fill="#FBBF24" />
            <Text style={styles.metaText}>{recipe.rating}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.authorContainer}>
            <Image source={{ uri: recipe.author.avatar }} style={styles.authorAvatar} />
            <Text style={styles.authorName}>{recipe.author.name}</Text>
            {recipe.author.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.calories}>{recipe.calories} cal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  compactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 12,
    width: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  authorName: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#68B684',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  calories: {
    fontSize: 12,
    color: '#68B684',
    fontWeight: '600',
  },
});