import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Gift, Star, Award } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { LoyaltyReward } from '@/types';

export function LoyaltyCard() {
  const { state } = useApp();
  const t = useTranslation(state.currentLanguage);
  
  const mockRewards: LoyaltyReward[] = [
    {
      id: 'reward-1',
      name: '10% Off Next Booking',
      description: 'Get 10% discount on your next chef booking',
      pointsRequired: 100,
      discountPercentage: 10,
      type: 'discount',
      isActive: true
    },
    {
      id: 'reward-2',
      name: 'Free Cleanup Service',
      description: 'Complimentary post-cooking cleanup',
      pointsRequired: 200,
      discountPercentage: 0,
      type: 'upgrade',
      isActive: true
    },
    {
      id: 'reward-3',
      name: 'Free Cooking Session',
      description: 'One complimentary 2-hour cooking session',
      pointsRequired: 500,
      discountPercentage: 100,
      type: 'free-session',
      isActive: true
    }
  ];

  const userPoints = state.currentUser?.loyaltyPoints || 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.pointsContainer}>
          <Star size={24} color="#F59E0B" fill="#F59E0B" />
          <View>
            <Text style={styles.pointsNumber}>{userPoints}</Text>
            <Text style={styles.pointsLabel}>{t.loyaltyPoints}</Text>
          </View>
        </View>
        <Award size={24} color="#3B82F6" />
      </View>

      <Text style={styles.sectionTitle}>{t.availableRewards}</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rewardsScroll}>
        {mockRewards.map((reward) => {
          const canRedeem = userPoints >= reward.pointsRequired;
          
          return (
            <View key={reward.id} style={[styles.rewardCard, !canRedeem && styles.disabledReward]}>
              <View style={styles.rewardHeader}>
                <Gift size={20} color={canRedeem ? '#10B981' : '#9CA3AF'} />
                <Text style={[styles.rewardPoints, !canRedeem && styles.disabledText]}>
                  {reward.pointsRequired} {t.pointsRequired}
                </Text>
              </View>
              
              <Text style={[styles.rewardName, !canRedeem && styles.disabledText]}>
                {reward.name}
              </Text>
              <Text style={[styles.rewardDescription, !canRedeem && styles.disabledText]}>
                {reward.description}
              </Text>
              
              <TouchableOpacity
                style={[styles.redeemButton, !canRedeem && styles.disabledButton]}
                disabled={!canRedeem}
              >
                <Text style={[styles.redeemButtonText, !canRedeem && styles.disabledButtonText]}>
                  {t.redeemReward}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  rewardsScroll: {
    flexDirection: 'row',
  },
  rewardCard: {
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    padding: 16,
    marginRight: 12,
    width: 200,
    borderWidth: 1,
    borderColor: '#F5F7FA',
  },
  disabledReward: {
    opacity: 0.6,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardPoints: {
    fontSize: 10,
    color: '#38B000',
    fontWeight: '500',
  },
  rewardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 16,
  },
  redeemButton: {
    backgroundColor: '#3A86FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#F5F7FA',
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#6B7280',
  },
  disabledText: {
    color: '#6B7280',
  },
});