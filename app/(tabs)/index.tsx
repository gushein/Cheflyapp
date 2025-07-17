import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Search, Filter, MapPin, Calendar, Settings } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { ChefCard } from '@/components/ChefCard';
import { LoyaltyCard } from '@/components/LoyaltyCard';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { AIMenuSuggestions } from '@/components/AIMenuSuggestions';
import { LiveTracking } from '@/components/LiveTracking';
import { NotificationCenter } from '@/components/NotificationCenter';
import { LanguageSelector } from '@/components/LanguageSelector';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { mockChefs, mockUser, mockSubscriptions, mockAISuggestions } from '@/data/mockData';
import { Chef, MealType, AIMenuSuggestion } from '@/types';

const MEAL_TYPES: { id: MealType; label: string; emoji: string }[] = [
  { id: 'home-style', label: 'Home Style', emoji: '🏠' },
  { id: 'diet-friendly', label: 'Diet Friendly', emoji: '🥗' },
  { id: 'fast-food', label: 'Fast Food', emoji: '🍔' },
  { id: 'gourmet', label: 'Gourmet', emoji: '🍷' },
  { id: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
  { id: 'vegan', label: 'Vegan', emoji: '🌱' },
];

export default function UserPanel() {
  const { state, dispatch } = useApp();
  const t = useTranslation(state.currentLanguage);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);
  const [filteredChefs, setFilteredChefs] = useState<Chef[]>([]);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    // Initialize app data
    dispatch({ type: 'SET_USER', payload: mockUser });
    dispatch({ type: 'SET_CHEFS', payload: mockChefs });
    dispatch({ type: 'SET_SUBSCRIPTIONS', payload: mockSubscriptions });
    dispatch({ type: 'SET_AI_SUGGESTIONS', payload: mockAISuggestions });
  }, [dispatch]);

  useEffect(() => {
    let filtered = state.chefs;
    
    if (searchQuery) {
      filtered = filtered.filter(chef =>
        chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chef.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    if (selectedMealType) {
      filtered = filtered.filter(chef =>
        chef.specialties.some(specialty => 
          specialty.toLowerCase().includes(selectedMealType.toLowerCase())
        )
      );
    }
    
    setFilteredChefs(filtered);
  }, [state.chefs, searchQuery, selectedMealType]);

  const handleChefSelect = (chef: Chef) => {
    setSelectedChef(chef);
    Alert.alert(
      'Book Chef',
      `Book ${chef.name} for your meal?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => handleBooking(chef) }
      ]
    );
  };

  const handleBooking = (chef: Chef) => {
    if (!selectedMealType) {
      Alert.alert('Please select a meal type first');
      return;
    }

    const newBooking = {
      id: `booking-${Date.now()}`,
      userId: state.currentUser?.id || 'user-1',
      chefId: chef.id,
      mealType: selectedMealType,
      date: '2024-01-15',
      time: '18:00',
      duration: 3,
      totalPrice: 240,
      status: 'pending' as const,
      address: state.currentUser?.address || '123 Main St, City, State 12345',
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_BOOKING', payload: newBooking });
    Alert.alert('Success', 'Booking request sent to chef!');
    setSelectedChef(null);
  };

  const handleAISuggestionSelect = (suggestion: AIMenuSuggestion) => {
    setSelectedMealType(suggestion.mealType);
    Alert.alert('AI Suggestion', `Applied ${suggestion.cuisineType} ${suggestion.mealType} suggestion!`);
  };

  // Get active booking for live tracking
  const activeBooking = state.bookings.find(booking => 
    ['chef-en-route', 'chef-arrived', 'cooking'].includes(booking.status)
  );

  if (state.loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>{t.findYourChef}</Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => setShowLanguageSelector(!showLanguageSelector)}
          >
            <Settings size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.location}>{t.downtownArea}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Language Selector */}
        {showLanguageSelector && <LanguageSelector />}
        
        {/* Notifications */}
        <NotificationCenter />
        
        {/* Live Tracking */}
        {activeBooking && <LiveTracking booking={activeBooking} />}
        
        {/* Loyalty Card */}
        <LoyaltyCard />
        
        {/* Active Subscriptions */}
        {state.subscriptions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.subscriptionPlans}</Text>
            {state.subscriptions.map((subscription) => (
              <SubscriptionCard key={subscription.id} subscription={subscription} />
            ))}
          </View>
        )}
        
        {/* AI Menu Suggestions */}
        <AIMenuSuggestions 
          suggestions={mockAISuggestions} 
          onSelectSuggestion={handleAISuggestionSelect}
        />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder={t.searchChefs}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#3A86FF" />
          </TouchableOpacity>
        </View>

        {/* Meal Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.mealTypes}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mealTypes}>
            {MEAL_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.mealTypeCard,
                  selectedMealType === type.id && styles.selectedMealType
                ]}
                onPress={() => setSelectedMealType(type.id)}
              >
                <Text style={styles.mealTypeEmoji}>{type.emoji}</Text>
                <Text style={[
                  styles.mealTypeLabel,
                  selectedMealType === type.id && styles.selectedMealTypeLabel
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Available Chefs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.availableChefs} ({filteredChefs.length})</Text>
          {filteredChefs.map((chef) => (
            <ChefCard
              key={chef.id}
              chef={chef}
              onPress={() => handleChefSelect(chef)}
            />
          ))}
        </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.recentBookings}</Text>
          {state.bookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>{t.noBookingsYet}</Text>
              <Text style={styles.emptyStateSubtext}>{t.bookFirstChef}</Text>
            </View>
          ) : (
            state.bookings.map((booking) => {
              const chef = state.chefs.find(c => c.id === booking.chefId);
              return (
                <View key={booking.id} style={styles.bookingCard}>
                  <Text style={styles.bookingChef}>{chef?.name}</Text>
                  <Text style={styles.bookingDetails}>
                    {booking.mealType} • {booking.date} • ${booking.totalPrice}
                  </Text>
                  <Text style={[styles.bookingStatus, { color: booking.status === 'confirmed' ? '#38B000' : '#FBBF24' }]}>
                    {booking.status.toUpperCase()}
                  </Text>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingsButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  mealTypes: {
    flexDirection: 'row',
  },
  mealTypeCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  selectedMealType: {
    backgroundColor: '#3A86FF',
  },
  mealTypeEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  mealTypeLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedMealTypeLabel: {
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  bookingChef: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  bookingDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  bookingStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
});