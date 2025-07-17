import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { Plus, BookOpen, Calendar, ShoppingCart, X } from 'lucide-react-native';

interface FloatingActionButtonProps {
  onAddRecipe: () => void;
  onAddMealPlan: () => void;
  onAddToCart: () => void;
}

export function FloatingActionButton({ 
  onAddRecipe, 
  onAddMealPlan, 
  onAddToCart 
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const menuItems = [
    { icon: BookOpen, label: 'Add Recipe', onPress: onAddRecipe, color: '#68B684' },
    { icon: Calendar, label: 'Plan Meal', onPress: onAddMealPlan, color: '#4299E1' },
    { icon: ShoppingCart, label: 'Add to Cart', onPress: onAddToCart, color: '#F6AD55' },
  ];

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    
    setIsExpanded(!isExpanded);
  };

  const handleMenuItemPress = (onPress: () => void) => {
    onPress();
    toggleMenu();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      {/* Menu Items */}
      {menuItems.map((item, index) => {
        const translateY = scaleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(60 * (index + 1))],
        });

        return (
          <Animated.View
            key={item.label}
            style={[
              styles.menuItem,
              {
                transform: [{ translateY }, { scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            <Text style={styles.menuLabel}>{item.label}</Text>
            <TouchableOpacity
              style={[styles.menuButton, { backgroundColor: item.color }]}
              onPress={() => handleMenuItemPress(item.onPress)}
            >
              <item.icon size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* Main FAB */}
      <TouchableOpacity
        style={[styles.fab, isExpanded && styles.fabExpanded]}
        onPress={toggleMenu}
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          {isExpanded ? (
            <X size={24} color="#FFFFFF" />
          ) : (
            <Plus size={24} color="#FFFFFF" />
          )}
        </Animated.View>
      </TouchableOpacity>

      {/* Backdrop */}
      {isExpanded && (
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: opacityAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.3] }) },
          ]}
        >
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={toggleMenu} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignItems: 'flex-end',
    zIndex: 1000,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#68B684',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#68B684',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  fabExpanded: {
    backgroundColor: '#E53E3E',
  },
  menuItem: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    backgroundColor: '#2D3748',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: '600',
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -100,
    bottom: -100,
    backgroundColor: '#000000',
    zIndex: -1,
  },
});