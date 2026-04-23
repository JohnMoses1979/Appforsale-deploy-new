import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../theme';
import CustomButton from '../common/CustomButton';

export default function AppCard({
  title,
  description,
  category,
  price,
  image,
  onPress,
}) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{category}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.footer}>
          <Text style={styles.price}>{price}</Text>
          <CustomButton title="View Details" onPress={onPress} style={styles.button} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
    marginBottom: SPACING.lg,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#2A2A2A',
  },
  content: {
    padding: SPACING.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,122,0,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,122,0,0.35)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: SPACING.md,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.h4,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.bodySm,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  footer: {
    gap: SPACING.md,
  },
  price: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.bodyLg,
    fontWeight: '800',
  },
  button: {
    width: '100%',
  },
});