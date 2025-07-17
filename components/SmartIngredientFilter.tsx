import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Filter, X } from 'lucide-react-native';

interface FilterTag {
  id: string;
  name: string;
  category: 'diet' | 'cuisine' | 'time' | 'difficulty';
  color: string;
}

const filterTags: FilterTag[] = [
  { id: '1', name: 'Vegetarian', category: 'diet', color: '#68B684' },
  { id: '2', name: 'Vegan', category: 'diet', color: '#48BB78' },
  { id: '3', name: 'Keto', category: 'diet', color: '#9F7AEA' },
  { id: '4', name: 'Italian', category: 'cuisine', color: '#F56565' },
  { id: '5', name: 'Asian', category: 'cuisine', color: '#ED8936' },
  { id: '6', name: 'Mexican', category: 'cuisine', color: '#ECC94B' },
  { id: '7', name: 'Under 15 min', category: 'time', color: '#4299E1' },
  { id: '8', name: 'Under 30 min', category: 'time', color: '#0BC5EA' },
  { id: '9', name: 'Easy', category: 'difficulty', color: '#38B2AC' },
  { id: '10', name: 'Medium', category: 'difficulty', color: '#D69E2E' },
];

interface SmartIngredientFilterProps {
  onFiltersChange: (filters: string[]) => void;
}

export function SmartIngredientFilter({ onFiltersChange }: SmartIngredientFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const animatedValues = useRef(
    filterTags.reduce((acc, tag) => {
      acc[tag.id] = new Animated.Value(0);
      return acc;
    }, {} as Record<string, Animated.Value>)
  ).current;

  const expandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isExpanded) {
      Animated.timing(expandAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();

      // Stagger animation for tags
      const animations = filterTags.map((tag, index) =>
        Animated.timing(animatedValues[tag.id], {
          toValue: 1,
          duration: 200,
          delay: index * 50,
          useNativeDriver: true,
        })
      );

      Animated.stagger(50, animations).start();
    } else {
      Animated.timing(expandAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      Object.values(animatedValues).forEach(anim => {
        Animated.timing(anim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isExpanded]);

  const toggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);

    // Animate selection
    const isSelected = newFilters.includes(filterId);
    Animated.spring(animatedValues[filterId], {
      toValue: isSelected ? 1.1 : 1,
      useNativeDriver: true,
    }).start(() => {
      if (isSelected) {
        Animated.spring(animatedValues[filterId], {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    onFiltersChange([]);
    
    // Animate all tags back to normal
    Object.values(animatedValues).forEach(anim => {
      Animated.spring(anim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };

  const maxHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  const groupedTags = filterTags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, FilterTag[]>);

  return (
    <View style={styles.container}>
      {/* Filter Header */}
      <TouchableOpacity 
        style={styles.filterHeader} 
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Filter size={20} color="#68B684" />
        <Text style={styles.filterTitle}>Smart Filters</Text>
        {selectedFilters.length > 0 && (
          <View style={styles.filterCount}>
            <Text style={styles.filterCountText}>{selectedFilters.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Selected Filters Preview */}
      {selectedFilters.length > 0 && (
        <View style={styles.selectedFilters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedFilters.map(filterId => {
              const tag = filterTags.find(t => t.id === filterId);
              if (!tag) return null;
              
              return (
                <TouchableOpacity
                  key={filterId}
                  style={[styles.selectedTag, { backgroundColor: tag.color }]}
                  onPress={() => toggleFilter(filterId)}
                >
                  <Text style={styles.selectedTagText}>{tag.name}</Text>
                  <X size={14} color="#FFFFFF" />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Expandable Filter Categories */}
      <Animated.View style={[styles.filterCategories, { maxHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.entries(groupedTags).map(([category, tags]) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              <View style={styles.tagsContainer}>
                {tags.map(tag => {
                  const isSelected = selectedFilters.includes(tag.id);
                  const animatedStyle = {
                    transform: [
                      { scale: animatedValues[tag.id] },
                    ],
                    opacity: animatedValues[tag.id],
                  };

                  return (
                    <Animated.View key={tag.id} style={animatedStyle}>
                      <TouchableOpacity
                        style={[
                          styles.filterTag,
                          isSelected && { backgroundColor: tag.color },
                          !isSelected && { borderColor: tag.color, borderWidth: 1 }
                        ]}
                        onPress={() => toggleFilter(tag.id)}
                      >
                        <Text
                          style={[
                            styles.filterTagText,
                            isSelected && styles.selectedTagText,
                            !isSelected && { color: tag.color }
                          ]}
                        >
                          {tag.name}
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    flex: 1,
  },
  filterCount: {
    backgroundColor: '#68B684',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  filterCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    gap: 6,
  },
  selectedTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
  },
  clearButtonText: {
    color: '#68B684',
    fontSize: 12,
    fontWeight: '600',
  },
  filterCategories: {
    overflow: 'hidden',
  },
  categorySection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
  },
  filterTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A5568',
  },
});