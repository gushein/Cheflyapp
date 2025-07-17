import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Award, Star, Trophy, Target, Zap } from 'lucide-react-native';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: 'award' | 'star' | 'trophy' | 'target' | 'zap';
  color: string;
  isUnlocked: boolean;
  progress?: number;
}

interface GamificationBadgesProps {
  badges: Badge[];
  newlyUnlocked?: string[];
}

export function GamificationBadges({ badges, newlyUnlocked = [] }: GamificationBadgesProps) {
  const animatedValues = useRef(
    badges.reduce((acc, badge) => {
      acc[badge.id] = {
        scale: new Animated.Value(1),
        rotation: new Animated.Value(0),
        confetti: new Animated.Value(0),
      };
      return acc;
    }, {} as Record<string, { scale: Animated.Value; rotation: Animated.Value; confetti: Animated.Value }>)
  ).current;

  useEffect(() => {
    newlyUnlocked.forEach(badgeId => {
      const animations = animatedValues[badgeId];
      if (animations) {
        // Celebration animation sequence
        Animated.sequence([
          // Initial pop
          Animated.timing(animations.scale, {
            toValue: 1.3,
            duration: 200,
            useNativeDriver: true,
          }),
          // Wiggle
          Animated.timing(animations.rotation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          // Settle
          Animated.parallel([
            Animated.timing(animations.scale, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(animations.rotation, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
        ]).start();

        // Confetti animation
        Animated.sequence([
          Animated.timing(animations.confetti, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animations.confetti, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });
  }, [newlyUnlocked]);

  const getIcon = (iconType: string, color: string, size: number = 24) => {
    switch (iconType) {
      case 'award':
        return <Award size={size} color={color} />;
      case 'star':
        return <Star size={size} color={color} fill={color} />;
      case 'trophy':
        return <Trophy size={size} color={color} />;
      case 'target':
        return <Target size={size} color={color} />;
      case 'zap':
        return <Zap size={size} color={color} fill={color} />;
      default:
        return <Award size={size} color={color} />;
    }
  };

  const renderConfetti = (badgeId: string) => {
    const confettiAnim = animatedValues[badgeId]?.confetti;
    if (!confettiAnim) return null;

    const confettiPieces = Array.from({ length: 8 }, (_, i) => {
      const translateY = confettiAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -50 - Math.random() * 30],
      });

      const translateX = confettiAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, (Math.random() - 0.5) * 60],
      });

      const rotate = confettiAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${Math.random() * 360}deg`],
      });

      return (
        <Animated.View
          key={i}
          style={[
            styles.confettiPiece,
            {
              backgroundColor: ['#68B684', '#F6AD55', '#4299E1', '#F56565'][i % 4],
              transform: [
                { translateX },
                { translateY },
                { rotate },
              ],
              opacity: confettiAnim,
            },
          ]}
        />
      );
    });

    return <View style={styles.confettiContainer}>{confettiPieces}</View>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      
      <View style={styles.badgesGrid}>
        {badges.map(badge => {
          const animations = animatedValues[badge.id];
          const isNewlyUnlocked = newlyUnlocked.includes(badge.id);

          const rotation = animations?.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '15deg'],
          }) || '0deg';

          return (
            <View key={badge.id} style={styles.badgeContainer}>
              {isNewlyUnlocked && renderConfetti(badge.id)}
              
              <Animated.View
                style={[
                  styles.badge,
                  {
                    backgroundColor: badge.isUnlocked ? badge.color + '20' : '#F7FAFC',
                    borderColor: badge.isUnlocked ? badge.color : '#E2E8F0',
                    transform: [
                      { scale: animations?.scale || 1 },
                      { rotate: rotation },
                    ],
                  },
                ]}
              >
                <View style={styles.badgeIcon}>
                  {getIcon(
                    badge.icon,
                    badge.isUnlocked ? badge.color : '#A0AEC0',
                    20
                  )}
                </View>
                
                <Text
                  style={[
                    styles.badgeName,
                    { color: badge.isUnlocked ? '#2D3748' : '#A0AEC0' },
                  ]}
                  numberOfLines={2}
                >
                  {badge.name}
                </Text>
                
                {badge.progress !== undefined && !badge.isUnlocked && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${badge.progress}%`,
                            backgroundColor: badge.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>{badge.progress}%</Text>
                  </View>
                )}
              </Animated.View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
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
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 16,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeContainer: {
    position: 'relative',
    width: '30%',
  },
  badge: {
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 12,
  },
  progressContainer: {
    width: '100%',
    marginTop: 8,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#E2E8F0',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 1.5,
  },
  progressText: {
    fontSize: 8,
    color: '#68B684',
    textAlign: 'center',
    marginTop: 2,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
  confettiPiece: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    top: '50%',
    left: '50%',
  },
});