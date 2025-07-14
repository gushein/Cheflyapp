import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Percent } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { Subscription } from '@/types';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const { state } = useApp();
  const t = useTranslation(state.currentLanguage);

  const getSubscriptionName = (type: string) => {
    switch (type) {
      case 'basic-10': return 'Basic Plan - 10 Sessions';
      case 'premium-20': return 'Premium Plan - 20 Sessions';
      case 'daily-lunch': return 'Daily Lunch Package';
      case 'weekly-dinner': return 'Weekly Dinner Plan';
      case 'diet-plan': return 'Custom Diet Plan';
      default: return type;
    }
  };

  const sessionsRemaining = subscription.sessionsTotal - subscription.sessionsUsed;
  const progressPercentage = (subscription.sessionsUsed / subscription.sessionsTotal) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Calendar size={20} color="#3B82F6" />
          <Text style={styles.title}>{getSubscriptionName(subscription.type)}</Text>
        </View>
        <View style={[styles.statusBadge, subscription.isActive ? styles.active : styles.inactive]}>
          <Text style={[styles.statusText, subscription.isActive ? styles.activeText : styles.inactiveText]}>
            {subscription.isActive ? 'Active' : 'Expired'}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {subscription.sessionsUsed} / {subscription.sessionsTotal} sessions used
        </Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.detailText}>
            {sessionsRemaining} {t.sessionsRemaining}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Percent size={16} color="#6B7280" />
          <Text style={styles.detailText}>
            {subscription.discount}% discount per session
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>${subscription.price}</Text>
        <TouchableOpacity style={styles.renewButton}>
          <Text style={styles.renewButtonText}>{t.renewSubscription}</Text>
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
    marginBottom: 12,
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
    flex: 1,
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
  active: {
    backgroundColor: '#D1FAE5',
  },
  inactive: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeText: {
    color: '#10B981',
  },
  inactiveText: {
    color: '#EF4444',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
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
    color: '#4B5563',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  renewButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  renewButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});