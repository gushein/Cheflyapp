import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { Booking } from '@/types';

interface LiveTrackingProps {
  booking: Booking;
}

export function LiveTracking({ booking }: LiveTrackingProps) {
  const { state } = useApp();
  const t = useTranslation(state.currentLanguage);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!booking.trackingEnabled || !booking.chefLocation) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'chef-en-route': return '#F59E0B';
      case 'chef-arrived': return '#10B981';
      case 'cooking': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'chef-en-route': return 'Chef is on the way';
      case 'chef-arrived': return 'Chef has arrived';
      case 'cooking': return 'Chef is cooking';
      default: return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Navigation size={20} color="#3B82F6" />
          <Text style={styles.title}>Live Tracking</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
          <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
        </View>
      </View>

      <View style={styles.trackingInfo}>
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.locationText}>{booking.chefLocation.address}</Text>
        </View>
        
        {booking.estimatedArrival && (
          <View style={styles.etaContainer}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.etaText}>
              ETA: {booking.estimatedArrival}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.mapPlaceholder}>
        <View style={styles.mapContent}>
          <MapPin size={48} color="#3B82F6" />
          <Text style={styles.mapText}>Live Map View</Text>
          <Text style={styles.mapSubtext}>Chef location updates in real-time</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.callButton}>
          <Phone size={16} color="#FFFFFF" />
          <Text style={styles.callButtonText}>Call Chef</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  trackingInfo: {
    gap: 8,
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  etaText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContent: {
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 8,
  },
  mapSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  messageButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  messageButtonText: {
    color: '#4B5563',
    fontWeight: '600',
    fontSize: 14,
  },
});