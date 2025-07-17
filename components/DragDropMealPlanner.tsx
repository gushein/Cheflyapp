import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, PanGestureHandler, State } from 'react-native';
import { Calendar, Plus, Clock } from 'lucide-react-native';
import { mockRecipes } from '@/data/mockData';

interface MealSlot {
  day: number;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  recipeId?: string;
}

export function DragDropMealPlanner() {
  const [mealSlots, setMealSlots] = useState<MealSlot[]>([]);
  const [draggedRecipe, setDraggedRecipe] = useState<string | null>(null);
  
  const dragAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: dragAnim, translationY: dragAnim } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.BEGAN) {
      Animated.spring(scaleAnim, {
        toValue: 1.1,
        useNativeDriver: true,
      }).start();
    } else if (event.nativeEvent.state === State.END) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      
      Animated.spring(dragAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const getMealForSlot = (day: number, mealType: string) => {
    const slot = mealSlots.find(s => s.day === day && s.mealType === mealType);
    if (slot?.recipeId) {
      return mockRecipes.find(r => r.id === slot.recipeId);
    }
    return null;
  };

  const addMealToSlot = (day: number, mealType: 'breakfast' | 'lunch' | 'dinner', recipeId: string) => {
    setMealSlots(prev => [
      ...prev.filter(s => !(s.day === day && s.mealType === mealType)),
      { day, mealType, recipeId }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Calendar size={24} color="#68B684" />
        <Text style={styles.headerTitle}>Weekly Meal Planner</Text>
      </View>

      {/* Recipe Bank */}
      <View style={styles.recipeBank}>
        <Text style={styles.sectionTitle}>Drag recipes to plan</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipesScroll}>
          {mockRecipes.slice(0, 5).map((recipe) => (
            <PanGestureHandler
              key={recipe.id}
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}
            >
              <Animated.View
                style={[
                  styles.recipeCard,
                  {
                    transform: [
                      { translateX: dragAnim },
                      { translateY: dragAnim },
                      { scale: scaleAnim }
                    ]
                  }
                ]}
              >
                <Text style={styles.recipeTitle} numberOfLines={2}>{recipe.title}</Text>
                <View style={styles.recipeMeta}>
                  <Clock size={12} color="#68B684" />
                  <Text style={styles.recipeTime}>{recipe.cookingTime}m</Text>
                </View>
              </Animated.View>
            </PanGestureHandler>
          ))}
        </ScrollView>
      </View>

      {/* Weekly Grid */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weeklyGrid}>
        <View style={styles.gridContainer}>
          {/* Header Row */}
          <View style={styles.gridRow}>
            <View style={styles.mealTypeHeader}>
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
              <View style={styles.mealTypeHeader}>
                <Text style={styles.mealTypeText}>
                  {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </Text>
              </View>
              
              {weekDays.map((_, dayIndex) => {
                const meal = getMealForSlot(dayIndex, mealType);
                
                return (
                  <TouchableOpacity
                    key={`${mealType}-${dayIndex}`}
                    style={styles.mealSlot}
                    onPress={() => {
                      if (mockRecipes[0]) {
                        addMealToSlot(dayIndex, mealType as any, mockRecipes[0].id);
                      }
                    }}
                  >
                    {meal ? (
                      <Animated.View style={styles.mealContent}>
                        <Text style={styles.mealTitle} numberOfLines={2}>
                          {meal.title}
                        </Text>
                        <View style={styles.mealMeta}>
                          <Clock size={10} color="#68B684" />
                          <Text style={styles.mealTime}>{meal.cookingTime}m</Text>
                        </View>
                      </Animated.View>
                    ) : (
                      <View style={styles.emptySlot}>
                        <Plus size={16} color="#A0AEC0" />
                        <Text style={styles.emptyText}>Add meal</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
  },
  recipeBank: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 12,
  },
  recipesScroll: {
    flexDirection: 'row',
  },
  recipeCard: {
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  recipeTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    lineHeight: 16,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recipeTime: {
    fontSize: 10,
    color: '#68B684',
    fontWeight: '500',
  },
  weeklyGrid: {
    flex: 1,
  },
  gridContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  mealTypeHeader: {
    width: 80,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  mealTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#68B684',
  },
  dayHeader: {
    width: 100,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3748',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#68B684',
    marginTop: 2,
  },
  mealSlot: {
    width: 100,
    height: 80,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 8,
    marginRight: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    borderStyle: 'dashed',
  },
  mealContent: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2D3748',
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
    fontSize: 9,
    color: '#68B684',
    fontWeight: '500',
  },
  emptySlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 9,
    color: '#A0AEC0',
    marginTop: 4,
    fontWeight: '500',
  },
});