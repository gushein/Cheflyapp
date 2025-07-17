import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, PanGestureHandler, State } from 'react-native';
import { ArrowLeft, Play, Pause, Timer, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Recipe } from '@/types';

interface CookingModeScreenProps {
  recipe: Recipe;
  onBack: () => void;
}

export function CookingModeScreen({ recipe, onBack }: CookingModeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      Animated.sequence([
        Animated.timing(cardAnim, {
          toValue: -300,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnim, {
          toValue: 300,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      
      setCurrentStep(currentStep + 1);
      updateProgress();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      Animated.sequence([
        Animated.timing(cardAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnim, {
          toValue: -300,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      
      setCurrentStep(currentStep - 1);
      updateProgress();
    }
  };

  const updateProgress = () => {
    const progress = (currentStep + 1) / recipe.instructions.length;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const currentInstruction = recipe.instructions[currentStep];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cooking Mode</Text>
        <View style={styles.stepCounter}>
          <Text style={styles.stepText}>{currentStep + 1}/{recipe.instructions.length}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
      </View>

      {/* Step Card */}
      <Animated.View style={[styles.stepCard, { transform: [{ translateX: cardAnim }] }]}>
        <View style={styles.stepHeader}>
          <Text style={styles.stepNumber}>Step {currentStep + 1}</Text>
          <Text style={styles.stepTitle}>{currentInstruction.title}</Text>
        </View>
        
        <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.stepDescription}>{currentInstruction.description}</Text>
          
          {currentInstruction.timer && (
            <View style={styles.timerContainer}>
              <Timer size={20} color="#68B684" />
              <Text style={styles.timerText}>{currentInstruction.timer} minutes</Text>
              <TouchableOpacity style={styles.timerButton}>
                <Text style={styles.timerButtonText}>Start Timer</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </Animated.View>

      {/* Navigation Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, currentStep === 0 && styles.disabledButton]} 
          onPress={prevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft size={24} color={currentStep === 0 ? '#A0AEC0' : '#2D3748'} />
          <Text style={[styles.controlText, currentStep === 0 && styles.disabledText]}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause size={24} color="#FFFFFF" /> : <Play size={24} color="#FFFFFF" />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, currentStep === recipe.instructions.length - 1 && styles.disabledButton]} 
          onPress={nextStep}
          disabled={currentStep === recipe.instructions.length - 1}
        >
          <Text style={[styles.controlText, currentStep === recipe.instructions.length - 1 && styles.disabledText]}>
            {currentStep === recipe.instructions.length - 1 ? 'Complete' : 'Next'}
          </Text>
          <ChevronRight size={24} color={currentStep === recipe.instructions.length - 1 ? '#A0AEC0' : '#2D3748'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  stepCounter: {
    backgroundColor: '#68B684',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  stepText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#68B684',
    borderRadius: 3,
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  stepHeader: {
    marginBottom: 20,
  },
  stepNumber: {
    fontSize: 14,
    color: '#68B684',
    fontWeight: '600',
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    lineHeight: 32,
  },
  stepContent: {
    flex: 1,
  },
  stepDescription: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  timerText: {
    fontSize: 14,
    color: '#68B684',
    fontWeight: '600',
    flex: 1,
  },
  timerButton: {
    backgroundColor: '#68B684',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  timerButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  controlText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
  },
  disabledText: {
    color: '#A0AEC0',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
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
});