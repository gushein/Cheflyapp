import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, CircleCheck as CheckCircle, Clock, Star, Calendar } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { Notification } from '@/types';

export function NotificationCenter() {
  const { state, dispatch } = useApp();
  const t = useTranslation(state.currentLanguage);

  const mockNotifications: Notification[] = [
    {
      id: 'notif-1',
      userId: 'user-1',
      type: 'chef-en-route',
      title: 'Chef is on the way!',
      message: 'Maria Rodriguez is heading to your location. ETA: 15 minutes',
      isRead: false,
      createdAt: new Date(),
      data: { chefId: '1', eta: '15 minutes' }
    },
    {
      id: 'notif-2',
      userId: 'user-1',
      type: 'loyalty-reward',
      title: 'Loyalty Points Earned!',
      message: 'You earned 50 points from your last booking. Total: 250 points',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000),
      data: { pointsEarned: 50, totalPoints: 250 }
    },
    {
      id: 'notif-3',
      userId: 'user-1',
      type: 'booking-confirmed',
      title: 'Booking Confirmed',
      message: 'Your booking with James Chen has been confirmed for tomorrow at 7:00 PM',
      isRead: true,
      createdAt: new Date(Date.now() - 7200000),
      data: { chefId: '2', date: 'tomorrow', time: '7:00 PM' }
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking-confirmed': return <CheckCircle size={20} color="#10B981" />;
      case 'chef-en-route': return <Clock size={20} color="#F59E0B" />;
      case 'chef-arrived': return <CheckCircle size={20} color="#3B82F6" />;
      case 'cooking-started': return <Clock size={20} color="#3B82F6" />;
      case 'meal-ready': return <CheckCircle size={20} color="#10B981" />;
      case 'loyalty-reward': return <Star size={20} color="#F59E0B" />;
      case 'subscription-reminder': return <Calendar size={20} color="#6B7280" />;
      default: return <Bell size={20} color="#6B7280" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id });
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Bell size={20} color="#3B82F6" />
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[styles.notificationItem, !notification.isRead && styles.unreadNotification]}
            onPress={() => handleNotificationPress(notification)}
          >
            <View style={styles.notificationIcon}>
              {getNotificationIcon(notification.type)}
            </View>
            
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, !notification.isRead && styles.unreadTitle]}>
                {notification.title}
              </Text>
              <Text style={styles.notificationMessage} numberOfLines={2}>
                {notification.message}
              </Text>
              <Text style={styles.notificationTime}>
                {formatTime(notification.createdAt)}
              </Text>
            </View>
            
            {!notification.isRead && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  notificationsList: {
    maxHeight: 300,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  unreadNotification: {
    backgroundColor: '#F8FAFC',
  },
  notificationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notificationMessage: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginTop: 8,
    marginLeft: 8,
  },
});