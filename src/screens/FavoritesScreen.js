import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SPACING } from '../constants/theme';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.anime.favorites);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { anime: item })}
    >
      <Image
        source={{ uri: item.poster_path }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.metaRow}>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={12} color={COLORS.gold} />
            <Text style={styles.rating}>{item.vote_average.toFixed(1)}</Text>
          </View>
          {item.episodes && (
            <Text style={styles.episodes}>{item.episodes} eps</Text>
          )}
        </View>
      </View>
      <View style={styles.iconContainer}>
          <Feather name="heart" size={20} color={COLORS.error} />
      </View>
    </TouchableOpacity>
  );

  if (favorites.length === 0) {
    return (
      <LinearGradient
        colors={[COLORS.background, COLORS.surface]}
        style={styles.emptyContainer}
      >
        <Feather name="heart" size={80} color={COLORS.primary} />
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubText}>Start adding anime to your favorites! 🎌</Text>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.l,
  },
  emptySubText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: SPACING.s,
    textAlign: 'center',
  },
  listContent: {
    padding: SPACING.m,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: SPACING.m,
    overflow: 'hidden',
    elevation: 4,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  poster: {
    width: 90,
    height: 130,
  },
  cardContent: {
    flex: 1,
    padding: SPACING.m,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.s,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.s,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 4,
    fontWeight: '600',
  },
  episodes: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  iconContainer: {
    padding: SPACING.m,
  }
});

export default FavoritesScreen;
