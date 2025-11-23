import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { loginSuccess } from '../store/authSlice';
import { registerUser } from '../services/api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomSplashScreen from '../components/CustomSplashScreen';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { Feather } from '@expo/vector-icons';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showSplash, setShowSplash] = useState(false);

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      setShowSplash(true);
      
      const userData = await registerUser(values.name, values.email, values.password);
      
      // Show splash screen for at least 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Persist user session
      await SecureStore.setItemAsync('userSession', JSON.stringify(userData));
      
      // Log the user in automatically
      dispatch(loginSuccess(userData));
      setShowSplash(false);
    } catch (error) {
      setShowSplash(false);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (showSplash) {
    return <CustomSplashScreen />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Feather name="user-plus" size={60} color={COLORS.primary} />
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join the anime community! 🎌</Text>
            </View>

            <View style={styles.formCard}>
              <Formik
                initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                  <View style={styles.form}>
                    <CustomInput
                      label="Full Name"
                      placeholder="Enter your name"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      error={errors.name}
                      touched={touched.name}
                    />
                    <CustomInput
                      label="Email"
                      placeholder="Enter your email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      error={errors.email}
                      touched={touched.email}
                    />
                    <CustomInput
                      label="Password"
                      placeholder="Enter your password"
                      secureTextEntry
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      error={errors.password}
                      touched={touched.password}
                    />
                    <CustomInput
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      secureTextEntry
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                    />

                    {errors.submit && (
                      <Text style={styles.errorText}>{errors.submit}</Text>
                    )}

                    <CustomButton
                      title="Register"
                      onPress={handleSubmit}
                      isLoading={isSubmitting}
                    />

                    <CustomButton
                      title="Already have an account? Login"
                      variant="outline"
                      onPress={() => navigation.navigate('Login')}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.l,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  iconContainer: {
    marginBottom: SPACING.m,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.poppinsBold,
    color: COLORS.primary,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: SPACING.l,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  form: {
    width: '100%',
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SPACING.m,
  },
});

export default RegisterScreen;
