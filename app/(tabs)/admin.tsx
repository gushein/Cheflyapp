import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Users, ChefHat, Calendar, DollarSign, TrendingUp, CircleAlert as AlertCircle, FileText, Globe } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { LanguageSelector } from '@/components/LanguageSelector';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { mockChefs, mockBookings, mockUser, mockInvoices } from '@/data/mockData';

export default function AdminPanel() {
  const { state, dispatch } = useApp();
  const t = useTranslation(state.currentLanguage);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalChefs: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    activeBookings: 0,
  });

  useEffect(() => {
    // Initialize data
    dispatch({ type: 'SET_CHEFS', payload: mockChefs });
    dispatch({ type: 'SET_USER', payload: mockUser });
    
    // Calculate admin stats
    const pendingBookings = mockBookings.filter(booking => booking.status === 'pending').length;
    const activeBookings = mockBookings.filter(booking => booking.status === 'confirmed').length;
    const totalRevenue = mockBookings.reduce((sum, booking) => sum + (booking.totalPrice * 0.1), 0); // 10% commission
    
    setAdminStats({
      totalUsers: 1, // Mock data
      totalChefs: mockChefs.length,
      totalBookings: mockBookings.length,
      totalRevenue,
      pendingBookings,
      activeBookings,
    });
  }, [dispatch]);

  if (state.loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>{t.adminDashboard}</Text>
            <Text style={styles.subtitle}>{t.chefConnectManagement}</Text>
          </View>
          <TouchableOpacity 
            style={styles.languageButton}
            onPress={() => setShowLanguageSelector(!showLanguageSelector)}
          >
            <Globe size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Language Selector */}
        {showLanguageSelector && <LanguageSelector />}
        
        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Users size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>{adminStats.totalUsers}</Text>
            <Text style={styles.statLabel}>{t.totalUsers}</Text>
          </View>
          
          <View style={styles.statCard}>
            <ChefHat size={24} color="#10B981" />
            <Text style={styles.statNumber}>{adminStats.totalChefs}</Text>
            <Text style={styles.statLabel}>{t.activeChefs}</Text>
          </View>
          
          <View style={styles.statCard}>
            <Calendar size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{adminStats.totalBookings}</Text>
            <Text style={styles.statLabel}>{t.totalBookings}</Text>
          </View>
          
          <View style={styles.statCard}>
            <DollarSign size={24} color="#EF4444" />
            <Text style={styles.statNumber}>${adminStats.totalRevenue}</Text>
            <Text style={styles.statLabel}>{t.revenue}</Text>
          </View>
        </View>

        {/* Alert Cards */}
        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>{t.systemAlerts}</Text>
          
          <View style={styles.alertCard}>
            <AlertCircle size={20} color="#F59E0B" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>{t.pendingBookings}</Text>
              <Text style={styles.alertText}>
                {adminStats.pendingBookings} booking{adminStats.pendingBookings !== 1 ? 's' : ''} awaiting chef confirmation
              </Text>
            </View>
          </View>
          
          <View style={styles.alertCard}>
            <TrendingUp size={20} color="#10B981" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Active Bookings</Text>
              <Text style={styles.alertText}>
                {adminStats.activeBookings} booking{adminStats.activeBookings !== 1 ? 's' : ''} confirmed and in progress
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.recentActivity}</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Users size={16} color="#3B82F6" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New User Registration</Text>
                <Text style={styles.activityTime}>John Doe joined • 2 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <ChefHat size={16} color="#10B981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Chef Application</Text>
                <Text style={styles.activityTime}>Maria Rodriguez verified • 5 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Calendar size={16} color="#F59E0B" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Booking Completed</Text>
                <Text style={styles.activityTime}>Home-style meal service • 1 day ago</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Chef Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.chefManagement}</Text>
          {state.chefs.map((chef) => (
            <View key={chef.id} style={styles.chefManagementCard}>
              <View style={styles.chefInfo}>
                <Text style={styles.chefName}>{chef.name}</Text>
                <Text style={styles.chefDetails}>
                  {chef.rating} ⭐ • {chef.reviewCount} reviews • {chef.location}
                </Text>
                <View style={styles.chefSpecialties}>
                  {chef.specialties.slice(0, 2).map((specialty, index) => (
                    <Text key={index} style={styles.specialty}>{specialty}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.chefActions}>
                <View style={[styles.statusBadge, chef.verified ? styles.verified : styles.unverified]}>
                  <Text style={[styles.statusText, chef.verified ? styles.verifiedText : styles.unverifiedText]}>
                    {chef.verified ? t.verified : t.pending}
                  </Text>
                </View>
                <TouchableOpacity style={styles.manageButton}>
                  <Text style={styles.manageButtonText}>{t.manage}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Invoice Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Management</Text>
          {mockInvoices.map((invoice) => (
            <View key={invoice.id} style={styles.invoiceCard}>
              <View style={styles.invoiceHeader}>
                <FileText size={20} color="#3B82F6" />
                <View style={styles.invoiceInfo}>
                  <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
                  <Text style={styles.invoiceDate}>
                    {invoice.issueDate.toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.invoiceAmount}>${invoice.total}</Text>
              </View>
              <View style={[styles.invoiceStatus, { backgroundColor: invoice.status === 'paid' ? '#D1FAE5' : '#FEF3C7' }]}>
                <Text style={[styles.invoiceStatusText, { color: invoice.status === 'paid' ? '#10B981' : '#F59E0B' }]}>
                  {invoice.status.toUpperCase()}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.paymentAnalytics}</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Total Transactions</Text>
              <Text style={styles.paymentValue}>$2,400</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Platform Commission (10%)</Text>
              <Text style={styles.paymentValue}>$240</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Chef Earnings</Text>
              <Text style={styles.paymentValue}>$2,160</Text>
            </View>
            <View style={[styles.paymentRow, styles.paymentTotal]}>
              <Text style={[styles.paymentLabel, styles.paymentTotalLabel]}>Net Revenue</Text>
              <Text style={[styles.paymentValue, styles.paymentTotalValue]}>$240</Text>
            </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  languageButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
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
  alertsSection: {
    marginBottom: 24,
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
  alertCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  alertContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  alertText: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  chefManagementCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  chefInfo: {
    flex: 1,
  },
  chefName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  chefDetails: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  chefSpecialties: {
    flexDirection: 'row',
    gap: 6,
  },
  specialty: {
    fontSize: 10,
    color: '#3A86FF',
    backgroundColor: '#E6F2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  chefActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  verified: {
    backgroundColor: '#E8F5E8',
  },
  unverified: {
    backgroundColor: '#FFF4E6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  verifiedText: {
    color: '#38B000',
  },
  unverifiedText: {
    color: '#FBBF24',
  },
  manageButton: {
    backgroundColor: '#3A86FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  manageButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  paymentCard: {
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
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  paymentTotal: {
    borderTopWidth: 1,
    borderTopColor: '#F5F7FA',
    marginTop: 8,
    paddingTop: 12,
  },
  paymentTotalLabel: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  paymentTotalValue: {
    fontWeight: '700',
    color: '#38B000',
  },
  invoiceCard: {
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
  invoiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  invoiceNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  invoiceDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  invoiceAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  invoiceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  invoiceStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});