import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import WatchingScreen from '../screens/WatchingScreen';
import CompletedScreen from '../screens/CompletedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AnimeList" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true, title: 'Anime Details', headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoritesList" component={FavoritesScreen} options={{ title: 'My Favorites', headerShown: true, headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }} />
    <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true, title: 'Anime Details', headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }} />
  </Stack.Navigator>
);

const WatchingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WatchingList" component={WatchingScreen} options={{ title: 'Watching', headerShown: true, headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }} />
    <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true, title: 'Anime Details', headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }} />
  </Stack.Navigator>
);

const CompletedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CompletedList" component={CompletedScreen} options={{ title: 'Completed', headerShown: true, headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }} />
    <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true, title: 'Anime Details', headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Favorites') {
          iconName = 'heart';
        } else if (route.name === 'Watching') {
          iconName = 'tv';
        } else if (route.name === 'Completed') {
          iconName = 'check-circle';
        } else if (route.name === 'Profile') {
          iconName = 'user';
        }

        return <Feather name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textSecondary,
      headerShown: false,
      tabBarStyle: {
        paddingBottom: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 11,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Watching" component={WatchingStack} />
    <Tab.Screen name="Completed" component={CompletedStack} />
    <Tab.Screen name="Favorites" component={FavoritesStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={AppTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
