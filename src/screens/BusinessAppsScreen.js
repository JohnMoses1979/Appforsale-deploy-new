import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';
import CommonFooter from '../components/CommonFooter';
import CommonHeader from '../components/common/CommonHeader';

export default function BusinessAppsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CommonHeader
          navigation={navigation}
          title="Business Apps"
          subtitle="Curated solutions for productivity"
          showBack
          showLogo={false}
          onBackPress={() => navigation.goBack()}
          rightLabel="Contact"
          onRightPress={() => navigation.navigate('Contact')}
          onNotificationPress={() => navigation.navigate('Notifications')}
          onProfilePress={() => navigation.navigate('Profile')}
        />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Back Button */}

        {/* Hero Section */}
        <LinearGradient
          colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
          style={styles.heroBlock}
        >
          <View style={styles.heroEyebrowWrap}>
            <Text style={styles.heroEyebrow}>CATEGORY</Text>
          </View>
          <Text style={styles.heroTitle}>Business Applications</Text>
          <Text style={styles.heroSubtitle}>
            Explore apps designed to streamline workflows, improve team collaboration,
            and boost productivity across industries.
          </Text>
        </LinearGradient>

        {/* Featured Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Business Apps</Text>
          <Text style={styles.sectionText}>
            • Project Management Tools{"\n"}
            • CRM Platforms{"\n"}
            • Accounting & Finance Solutions{"\n"}
            • HR & Payroll Systems{"\n"}
            • Communication & Collaboration Suites
          </Text>
        </View>

        {/* Footer */}
        <CommonFooter app="Business Apps" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingHorizontal: 18, paddingBottom: 44 },
  heroBlock: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 16,
  },
  heroEyebrowWrap: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(103,230,232,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(103,230,232,0.30)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
  },
  heroEyebrow: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});
