import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

const CustomButton = ({ title, onPress, isLoading, variant = 'primary' }) => {
  const backgroundColor = variant === 'primary' ? COLORS.primary : 'transparent';
  const textColor = variant === 'primary' ? COLORS.white : COLORS.primary;
  const border = variant === 'outline' ? { borderWidth: 1, borderColor: COLORS.primary } : {};

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, border]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.m,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.s,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
