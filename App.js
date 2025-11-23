import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Fredoka_400Regular, Fredoka_500Medium, Fredoka_600SemiBold, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { store } from './src/store/store';
import { restoreToken } from './src/store/authSlice';
import { setFavorites, setWatching, setCompleted } from './src/store/moviesSlice';
import AppNavigator from './src/navigation/AppNavigator';
import CustomSplashScreen from './src/components/CustomSplashScreen';
import { StatusBar } from 'expo-status-bar';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);
  
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        console.log('Starting app preparation...');
        
        // Restore user session
        const userSession = await SecureStore.getItemAsync('userSession');
        if (userSession) {
          dispatch(restoreToken(JSON.parse(userSession)));
        }

        // Restore favorites
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
          dispatch(setFavorites(JSON.parse(favorites)));
        }

        // Restore watching list
        const watching = await AsyncStorage.getItem('watching');
        if (watching) {
          dispatch(setWatching(JSON.parse(watching)));
        }

        // Restore completed list
        const completed = await AsyncStorage.getItem('completed');
        if (completed) {
          dispatch(setCompleted(JSON.parse(completed)));
        }
        
        console.log('App preparation complete!');
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, [dispatch]);

  useEffect(() => {
    if (fontsLoaded && appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
