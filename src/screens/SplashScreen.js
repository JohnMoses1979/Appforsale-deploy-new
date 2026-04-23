import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../theme';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Apps Marketplace</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.h1,
    fontWeight: '800',
  },
});