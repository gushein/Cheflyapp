import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Brain, Clock, TrendingUp, Zap } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { AIMenuSuggestion } from '@/types';

interface AIMenuSuggestionsProps {
  suggestions: AIMenuSuggestion[];
  onSelectSuggestion: (suggestion: AIMenuSuggestion) => void;
}

export function AIMenuSuggestions({ suggestions, onSelectSuggestion }: AIMenuSuggestionsProps) {
  const { state } = useApp();
  const t = useTranslation(state.currentLanguage);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getDifficultyBackground = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#D1FAE5';
      case 'medium': return '#FEF3C7';
      case 'hard': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Brain size={24} color="#3B82F6" />
        <Text style={styles.title}>{t.aiSuggestions}</Text>
      </View>
      
      <Text style={styles.subtitle}>{t.basedOnPreferences}</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsScroll}>
        {suggestions.map((suggestion) => (
          <TouchableOpacity
            key={suggestion.id}
            style={styles.suggestionCard}
            onPress={() => onSelectSuggestion(suggestion)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cuisineType}>{suggestion.cuisineType}</Text>
              <View style={styles.matchScore}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={styles.matchScoreText}>{suggestion.matchScore}%</Text>
              </View>
            </View>
            
            <Text style={styles.mealType}>{suggestion.mealType.replace('-', ' ').toUpperCase()}</Text>
            
            <View style={styles.nutritionInfo}>
              <Text style={styles.calories}>{suggestion.nutritionalInfo.calories} cal</Text>
              <Text style={styles.protein}>{suggestion.nutritionalInfo.protein}g protein</Text>
            </View>
            
            <View style={styles.ingredients}>
              {suggestion.ingredients.slice(0, 3).map((ingredient, index) => (
                <View key={index} style={styles.ingredientTag}>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.cardFooter}>
              <View style={styles.timeContainer}>
                <Clock size={12} color="#6B7280" />
                <Text style={styles.timeText}>{suggestion.estimatedCookingTime}m</Text>
              </View>
              
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyBackground(suggestion.difficulty) }
              ]}>
                <Text style={[
                  styles.difficultyText,
                  { color: getDifficultyColor(suggestion.difficulty) }
                ]}>
                  {suggestion.difficulty}
                </Text>
              </View>
            </View>
            
            <Text style={styles.reason}>{suggestion.reason}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  suggestionsScroll: {
    flexDirection: 'row',
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cuisineType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  matchScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchScoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  mealType: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
    marginBottom: 8,
  },
  nutritionInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  calories: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
  },
  protein: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  ingredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
  },
  ingredientTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ingredientText: {
    fontSize: 10,
    color: '#4B5563',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '500',
  },
  reason: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 14,
  },
});