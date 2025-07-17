import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export function LoadingSpinner({ size = 'large', color = '#68B684' }: LoadingSpinnerProps) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    spinAnimation.start();
    pulseAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.cookingPot,
          {
            transform: [{ rotate: spin }, { scale: scaleValue }],
          },
        ]}
      >
        <View style={styles.pot} />
        <View style={styles.steam1} />
        <View style={styles.steam2} />
        <View style={styles.steam3} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
  },
  cookingPot: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  pot: {
    width: 60,
    height: 40,
    backgroundColor: '#68B684',
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  steam1: {
    width: 4,
    height: 20,
    backgroundColor: '#E8F4EA',
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    left: 25,
    opacity: 0.7,
  },
  steam2: {
    width: 4,
    height: 15,
    backgroundColor: '#E8F4EA',
    borderRadius: 2,
    position: 'absolute',
    top: 5,
    left: 35,
    opacity: 0.5,
  },
  steam3: {
    width: 4,
    height: 18,
    backgroundColor: '#E8F4EA',
    borderRadius: 2,
    position: 'absolute',
    top: 2,
    left: 45,
    opacity: 0.6,
  },
});