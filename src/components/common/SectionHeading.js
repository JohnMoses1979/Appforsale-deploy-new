import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

export default function SectionHeading({ label, title, subtitle, centered = false }) {
  return (
    <View style={[styles.container, centered && styles.centered]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Text style={[styles.title, centered && styles.centerText]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, centered && styles.centerText]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  centered: {
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  label: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.h2,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    lineHeight: 24,
  },
});