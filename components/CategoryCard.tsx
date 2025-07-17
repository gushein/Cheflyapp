import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    emoji: string;
    color: string;
  };
  onPress: () => void;
  isSelected?: boolean;
}

export function CategoryCard({ category, onPress, isSelected = false }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isSelected ? category.color : '#FFFFFF' },
        isSelected && styles.selectedContainer
      ]}
      onPress={onPress}
    >
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text style={[
        styles.name,
        { color: isSelected ? '#FFFFFF' : '#1A1A1A' }
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 12,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  selectedContainer: {
    borderColor: 'transparent',
    shadowOpacity: 0.15,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});