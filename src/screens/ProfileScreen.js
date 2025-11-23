import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { logout } from '../store/authSlice';
import { COLORS, SPACING } from '../constants/theme';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.anime.favorites);
  const watching = useSelector((state) => state.anime.watching);
  const completed = useSelector((state) => state.anime.completed);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Feather name="user" size={60} color={COLORS.white} />
          </View>
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Feather name="heart" size={24} color={COLORS.error} />
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Feather name="tv" size={24} color={COLORS.blue} />
            <Text style={styles.statNumber}>{watching.length}</Text>
            <Text style={styles.statLabel}>Watching</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Feather name="check-circle" size={24} color={COLORS.green} />
            <Text style={styles.statNumber}>{completed.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="user" size={20} color={COLORS.primary} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="bell" size={20} color={COLORS.primary} />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="lock" size={20} color={COLORS.primary} />
              <Text style={styles.menuItemText}>Privacy & Security</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="moon" size={20} color={COLORS.primary} />
              <Text style={styles.menuItemText}>Dark Mode</Text>
            </View>
            <View style={styles.switch}>
              <Text style={styles.switchText}>Coming Soon</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="globe" size={20} color={COLORS.primary} />
              <Text style={styles.menuItemText}>Language</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="info" size={20} color={COLORS.primary} />
              <Text style={styles.menuItemText}>About AnimeFlux</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="file-text" size={20} color={COLORS.primary} />
              <Text style={styles.menuItemText}>Terms & Conditions</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="shield" size={20} color={COLORS.primary} />
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={20} color={COLORS.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SPACING.xl + 20,
    paddingBottom: SPACING.xl,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatarContainer: {
    marginBottom: SPACING.m,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.m,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.m,
    marginBottom: SPACING.l,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.s,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.gray,
  },
  section: {
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.s,
    marginLeft: SPACING.xs,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.m,
    borderRadius: 12,
    marginBottom: SPACING.s,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: SPACING.m,
  },
  switch: {
    paddingHorizontal: SPACING.s,
    paddingVertical: 4,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  switchText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.error,
    padding: SPACING.m,
    borderRadius: 12,
    marginTop: SPACING.l,
    marginBottom: SPACING.m,
    elevation: 3,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: SPACING.s,
  },
  version: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
});

export default ProfileScreen;
