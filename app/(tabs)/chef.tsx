import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Calendar, Clock, DollarSign, Star, CircleCheck as CheckCircle, X, Video, Share2 } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { BookingCard } from '@/components/BookingCard';
import { NotificationCenter } from '@/components/NotificationCenter';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { mockChefs, mockBookings } from '@/data/mockData';
import { Chef, Booking } from '@/types';

export default function ChefPanel() {
  const { state, dispatch } = useApp();
  const t = useTranslation(state.currentLanguage);
  const [isAvailable, setIsAvailable] = useState(true);
  const [liveStreamingActive, setLiveStreamingActive] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [chefStats, setChefStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    totalEarnings: 0,
    avgRating: 0,
  });

  // Mock current chef (in real app, this would come from auth)
  const currentChef: Chef = mockChefs[0];

  useEffect(() => {
    dispatch({ type: 'SET_CHEFS', payload: mockChefs });
    
    // Calculate stats
    const chefBookings = mockBookings.filter(booking => booking.chefId === currentChef.id);
    const completed = chefBookings.filter(booking => booking.status === 'completed');
    const totalEarnings = completed.reduce((sum, booking) => sum + booking.totalPrice, 0);
    
    setChefStats({
      totalBookings: chefBookings.length,
      completedBookings: completed.length,
      totalEarnings,
      avgRating: currentChef.rating,
    });
  }, [dispatch, currentChef.id, currentChef.rating]);

  const handleBookingAction = (booking: Booking, action: 'accept' | 'reject') => {
    const newStatus = action === 'accept' ? 'confirmed' : 'cancelled';
    
    dispatch({
      type: 'UPDATE_BOOKING',
      payload: {
        id: booking.id,
        updates: { status: newStatus }
      }
    });
    
    Alert.alert(
      'Success',
      `Booking ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`
    );
  };

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    // In real app, this would update the chef's availability in the database
  };

  const toggleLiveStreaming = () => {
    setLiveStreamingActive(!liveStreamingActive);
    Alert.alert(
      'Live Streaming',
      liveStreamingActive ? 'Live stream stopped' : 'Live stream started!'
    );
  };

  if (state.loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.chefDashboard}</Text>
        <Text style={styles.subtitle}>{t.welcomeBack}, {currentChef.name}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <NotificationCenter />
        
        {/* Availability Toggle */}
        <View style={styles.availabilityCard}>
          <View style={styles.availabilityHeader}>
            <Text style={styles.availabilityTitle}>{t.availabilityStatus}</Text>
            <Switch
              value={isAvailable}
              onValueChange={toggleAvailability}
              trackColor={{ false: '#E5E7EB', true: '#10B981' }}
              thumbColor={isAvailable ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
          <Text style={[styles.availabilityStatus, { color: isAvailable ? '#10B981' : '#EF4444' }]}>
            {isAvailable ? t.availableForBookings : t.currentlyUnavailable}
          </Text>
        </View>

        {/* Live Streaming Controls */}
        {currentChef.liveStreamingEnabled && (
          <View style={styles.streamingCard}>
            <View style={styles.streamingHeader}>
              <View style={styles.streamingTitleContainer}>
                <Video size={20} color="#EF4444" />
                <Text style={styles.streamingTitle}>Live Streaming</Text>
              </View>
              <Switch
                value={liveStreamingActive}
                onValueChange={toggleLiveStreaming}
                trackColor={{ false: '#E5E7EB', true: '#EF4444' }}
                thumbColor={liveStreamingActive ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
            <Text style={[styles.streamingStatus, { color: liveStreamingActive ? '#EF4444' : '#6B7280' }]}>
              {liveStreamingActive ? 'Live streaming active' : 'Stream offline'}
            </Text>
            {liveStreamingActive && (
              <TouchableOpacity style={styles.shareButton}>
                <Share2 size={16} color="#3B82F6" />
                <Text style={styles.shareButtonText}>Share Stream</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Calendar size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>{chefStats.totalBookings}</Text>
            <Text style={styles.statLabel}>{t.totalBookings}</Text>
          </View>
          
          <View style={styles.statCard}>
            <CheckCircle size={24} color="#10B981" />
            <Text style={styles.statNumber}>{chefStats.completedBookings}</Text>
            <Text style={styles.statLabel}>{t.completed}</Text>
          </View>
          
          <View style={styles.statCard}>
            <DollarSign size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>${chefStats.totalEarnings}</Text>
            <Text style={styles.statLabel}>{t.totalEarnings}</Text>
          </View>
          
          <View style={styles.statCard}>
            <Star size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{chefStats.avgRating}</Text>
            <Text style={styles.statLabel}>{t.avgRating}</Text>
          </View>
        </View>

        {/* Pending Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.pendingBookings}</Text>
          {state.bookings.filter(booking => booking.status === 'pending').length === 0 ? (
            <View style={styles.emptyState}>
              <Clock size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>{t.noPendingBookings}</Text>
              <Text style={styles.emptyStateSubtext}>{t.newBookingRequests}</Text>
            </View>
          ) : (
            state.bookings
              .filter(booking => booking.status === 'pending' && booking.chefId === currentChef.id)
              .map((booking) => (
                <View key={booking.id} style={styles.bookingContainer}>
                  <BookingCard
                    booking={booking}
                    chefName="Customer Request"
                  />
                  <View style={styles.bookingActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.acceptButton]}
                      onPress={() => handleBookingAction(booking, 'accept')}
                    >
                      <CheckCircle size={16} color="#FFFFFF" />
                      <Text style={styles.acceptButtonText}>{t.accept}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.actionButton, styles.rejectButton]}
                      onPress={() => handleBookingAction(booking, 'reject')}
                    >
                      <X size={16} color="#FFFFFF" />
                      <Text style={styles.rejectButtonText}>{t.reject}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
          )}
        </View>

        {/* Upcoming Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.upcomingBookings}</Text>
          {state.bookings
            .filter(booking => booking.status === 'confirmed' && booking.chefId === currentChef.id)
            .map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                chefName="Confirmed Booking"
              />
            ))}
        </View>

        {/* Recent Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.recentReviews}</Text>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />
                ))}
              </View>
              <Text style={styles.reviewDate}>2 days ago</Text>
            </View>
            <Text style={styles.reviewText}>
              "Amazing experience! Maria prepared the most delicious authentic Mexican meal. 
              Highly recommended!"
            </Text>
            <Text style={styles.reviewAuthor}>- John D.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: 'linear-gradient(135deg, #FDFDFD 0%, #F5F7FA 100%)',
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
  title: {
    fontSize: 28,
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
  availabilityCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
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
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  availabilityStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  streamingCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
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
  streamingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  streamingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streamingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  streamingStatus: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E6F2FF',
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  shareButtonText: {
    color: '#3A86FF',
    fontSize: 12,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
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
    color: '#6B7280',
    marginTop: 4,
  },
  bookingContainer: {
    marginBottom: 16,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    gap: 6,
  },
  acceptButton: {
    backgroundColor: '#38B000',
  },
  rejectButton: {
    backgroundColor: '#FF6B6B',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  rejectButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
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
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});