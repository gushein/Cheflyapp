import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Plus, Clock, Users } from 'lucide-react-native';
import { mockMealPlans, mockRecipes } from '@/data/mockData';

export default function MealPlanScreen() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const activeMealPlan = mockMealPlans[0];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  const getRecipeForMeal = (day: number, mealType: string) => {
    const mealPlanRecipe = activeMealPlan.recipes.find(
      r => r.day === day && r.mealType === mealType
    );
    if (mealPlanRecipe) {
      return mockRecipes.find(r => r.id === mealPlanRecipe.recipeId);
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Plan</Text>
        <Text style={styles.subtitle}>Plan your weekly meals</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Active Plan Info */}
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <Calendar size={24} color="#68B684" />
            <View style={styles.planInfo}>
              <Text style={styles.planName}>{activeMealPlan.name}</Text>
              <Text style={styles.planDescription}>{activeMealPlan.description}</Text>
            </View>
          </View>
          
          <View style={styles.planStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{activeMealPlan.duration}</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{activeMealPlan.totalCalories}</Text>
              <Text style={styles.statLabel}>Daily Calories</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{activeMealPlan.recipes.length}</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
          </View>
        </View>

        {/* Weekly Calendar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.weeklyGrid}>
              {/* Header Row */}
              <View style={styles.gridRow}>
                <View style={styles.mealTypeCell}>
                  <Text style={styles.mealTypeText}>Meal</Text>
                </View>
                {weekDays.map((day, index) => (
                  <View key={day} style={styles.dayHeader}>
                    <Text style={styles.dayText}>{day}</Text>
                    <Text style={styles.dateText}>{index + 1}</Text>
                  </View>
                ))}
              </View>

              {/* Meal Rows */}
              {mealTypes.map((mealType) => (
                <View key={mealType} style={styles.gridRow}>
                  <View style={styles.mealTypeCell}>
                    <Text style={styles.mealTypeText}>
                      {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                    </Text>
                  </View>
                  
                  {weekDays.map((_, dayIndex) => {
                    const recipe = getRecipeForMeal(dayIndex + 1, mealType);
                    
                    return (
                      <TouchableOpacity
                        key={`${mealType}-${dayIndex}`}
                        style={styles.mealCell}
                      >
                        {recipe ? (
                          <View style={styles.mealContent}>
                            <Text style={styles.mealTitle} numberOfLines={2}>
                              {recipe.title}
                            </Text>
                            <View style={styles.mealMeta}>
                              <Clock size={12} color="#6B7280" />
                              <Text style={styles.mealTime}>{recipe.cookingTime}m</Text>
                            </View>
                          </View>
                        ) : (
                          <View style={styles.emptyMeal}>
                            <Plus size={20} color="#6B7280" />
                            <Text style={styles.addMealText}>Add meal</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Plus size={24} color="#68B684" />
              <Text style={styles.actionTitle}>Create New Plan</Text>
              <Text style={styles.actionSubtitle}>Start fresh meal planning</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={24} color="#3A86FF" />
              <Text style={styles.actionTitle}>Browse Templates</Text>
              <Text style={styles.actionSubtitle}>Use pre-made meal plans</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shopping List Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shopping List</Text>
          
          <View style={styles.shoppingCard}>
            <View style={styles.shoppingHeader}>
              <Text style={styles.shoppingTitle}>This Week's Ingredients</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.ingredientsList}>
              <Text style={styles.ingredientItem}>• 2 Avocados</Text>
              <Text style={styles.ingredientItem}>• 1 cup Quinoa</Text>
              <Text style={styles.ingredientItem}>• 12 oz Penne pasta</Text>
              <Text style={styles.ingredientItem}>• 8 oz Mixed mushrooms</Text>
              <Text style={styles.moreItems}>+12 more items</Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  planStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  weeklyGrid: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  mealTypeCell: {
    width: 80,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  mealTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  dayHeader: {
    width: 100,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#68B684',
    marginTop: 2,
  },
  mealCell: {
    width: 100,
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 8,
    marginRight: 4,
  },
  mealContent: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
    lineHeight: 12,
  },
  mealMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 'auto',
  },
  mealTime: {
    fontSize: 10,
    color: '#6B7280',
  },
  emptyMeal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMealText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  shoppingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  shoppingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shoppingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#68B684',
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  ingredientsList: {
    gap: 4,
  },
  ingredientItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  moreItems: {
    fontSize: 12,
    color: '#68B684',
    fontWeight: '500',
    marginTop: 4,
  },
});