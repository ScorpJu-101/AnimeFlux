import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

const CustomInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry,
  error,
  touched,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          touched && error ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={COLORS.textSecondary}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: SPACING.m,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: SPACING.xs,
  },
});

export default CustomInput;
