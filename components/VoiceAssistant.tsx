import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Mic, MicOff, Volume2 } from 'lucide-react-native';

interface VoiceAssistantProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function VoiceAssistant({ isVisible, onToggle }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const waveAnim1 = useRef(new Animated.Value(0)).current;
  const waveAnim2 = useRef(new Animated.Value(0)).current;
  const waveAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isListening) {
      // Pulse animation for mic button
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Wave animations
      const createWaveAnimation = (animValue: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        );
      };

      createWaveAnimation(waveAnim1, 0).start();
      createWaveAnimation(waveAnim2, 200).start();
      createWaveAnimation(waveAnim3, 400).start();
    } else {
      pulseAnim.stopAnimation();
      waveAnim1.stopAnimation();
      waveAnim2.stopAnimation();
      waveAnim3.stopAnimation();
    }
  }, [isListening]);

  useEffect(() => {
    if (currentMessage) {
      Animated.spring(bubbleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(bubbleAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [currentMessage]);

  const handleMicPress = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setCurrentMessage("I heard: 'What's the next step?'");
        setTimeout(() => {
          setCurrentMessage("Mix the ingredients thoroughly for 2 minutes.");
        }, 1500);
      }, 2000);
    } else {
      setCurrentMessage('');
    }
  };

  const waveScale1 = waveAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.4],
  });

  const waveScale2 = waveAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.2],
  });

  const waveScale3 = waveAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1.0],
  });

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {/* Speech Bubble */}
      {currentMessage && (
        <Animated.View 
          style={[
            styles.speechBubble,
            {
              transform: [{ scale: bubbleAnim }],
              opacity: bubbleAnim,
            }
          ]}
        >
          <Text style={styles.speechText}>{currentMessage}</Text>
          <View style={styles.bubbleTail} />
        </Animated.View>
      )}

      {/* Voice Assistant Button */}
      <View style={styles.micContainer}>
        {isListening && (
          <>
            <Animated.View style={[styles.wave, styles.wave1, { transform: [{ scale: waveScale1 }] }]} />
            <Animated.View style={[styles.wave, styles.wave2, { transform: [{ scale: waveScale2 }] }]} />
            <Animated.View style={[styles.wave, styles.wave3, { transform: [{ scale: waveScale3 }] }]} />
          </>
        )}
        
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micButtonActive]}
            onPress={handleMicPress}
          >
            {isListening ? (
              <MicOff size={24} color="#FFFFFF" />
            ) : (
              <Mic size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Status Text */}
      <Text style={styles.statusText}>
        {isListening ? 'Listening...' : 'Tap to speak'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 12,
    maxWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  speechText: {
    fontSize: 14,
    color: '#2D3748',
    textAlign: 'center',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  micContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wave: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(104, 182, 132, 0.2)',
  },
  wave1: {
    width: 80,
    height: 80,
  },
  wave2: {
    width: 100,
    height: 100,
  },
  wave3: {
    width: 120,
    height: 120,
  },
  micButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  micButtonActive: {
    backgroundColor: '#E53E3E',
  },
  statusText: {
    fontSize: 12,
    color: '#68B684',
    fontWeight: '600',
    marginTop: 8,
  },
});