import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './src/store/store';
import { restoreToken } from './src/store/authSlice';
import { setFavorites, setWatching, setCompleted } from './src/store/moviesSlice';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
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
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, [dispatch]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
