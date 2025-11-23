import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { loginSuccess } from '../store/authSlice';
import { loginUser } from '../services/api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { COLORS, SPACING } from '../constants/theme';
import { Feather } from '@expo/vector-icons';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const userData = await loginUser(values.email, values.password);
      
      // Persist user session
      await SecureStore.setItemAsync('userSession', JSON.stringify(userData));
      
      dispatch(loginSuccess(userData));
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.accent2]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Feather name="tv" size={60} color={COLORS.white} />
              </View>
              <Text style={styles.title}>Welcome to AnimeFlux</Text>
              <Text style={styles.subtitle}>Sign in to discover amazing anime 🎌</Text>
            </View>

            <View style={styles.formCard}>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                  <View style={styles.form}>
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
                    
                    {errors.submit && (
                      <Text style={styles.errorText}>{errors.submit}</Text>
                    )}

                    <CustomButton
                      title="Login"
                      onPress={handleSubmit}
                      isLoading={isSubmitting}
                    />

                    <CustomButton
                      title="Create Account"
                      variant="outline"
                      onPress={() => navigation.navigate('Register')}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
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
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
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

export default LoginScreen;
