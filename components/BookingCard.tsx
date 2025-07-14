import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react-native';
import { Booking } from '@/types';
import { formatDate, formatTime } from '@/utils/dateUtils';

interface BookingCardProps {
  booking: Booking;
  chefName: string;
  onPress?: () => void;
}

export function BookingCard({ booking, chefName, onPress }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#38B000';
      case 'pending': return '#FBBF24';
      case 'completed': return '#3A86FF';
      case 'cancelled': return '#FF6B6B';
      default: return '#6B7280';
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case 'confirmed': return '#E8F5E8';
      case 'pending': return '#FFF4E6';
      case 'completed': return '#E6F2FF';
      case 'cancelled': return '#FFE8E8';
      default: return '#F5F7FA';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.chefName}>{chefName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBackground(booking.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.detailText}>{formatDate(booking.date)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.detailText}>{formatTime(booking.time)} • {booking.duration}h</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.detailText} numberOfLines={1}>{booking.address}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <DollarSign size={16} color="#6B7280" />
          <Text style={styles.detailText}>${booking.totalPrice}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.mealType}>{booking.mealType.replace('-', ' ').toUpperCase()}</Text>
        <Text style={styles.bookingId}>#{booking.id.slice(-6)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chefName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  details: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F7FA',
  },
  mealType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3A86FF',
  },
  bookingId: {
    fontSize: 12,
    color: '#6B7280',
  },
});