import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SPACING } from '../constants/theme';
import { Feather } from '@expo/vector-icons';

const WatchingScreen = ({ navigation }) => {
  const watching = useSelector((state) => state.anime.watching);

  const renderAnimeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { anime: item })}
    >
      <Image source={{ uri: item.poster_path }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.meta}>
          <View style={styles.rating}>
            <Feather name="star" size={14} color={COLORS.accent} />
            <Text style={styles.ratingText}>{item.vote_average?.toFixed(1)}</Text>
          </View>
          {item.episodes && (
            <View style={styles.episodes}>
              <Feather name="tv" size={14} color={COLORS.blue} />
              <Text style={styles.episodesText}>{item.episodes} eps</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Feather name="tv" size={28} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Currently Watching</Text>
        </View>
        <Text style={styles.count}>{watching.length} anime</Text>
      </View>

      {watching.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="tv" size={80} color={COLORS.border} />
          <Text style={styles.emptyText}>No anime in your watching list</Text>
          <Text style={styles.emptySubText}>
            Start watching anime from the home screen!
          </Text>
        </View>
      ) : (
        <FlatList
          data={watching}
          renderItem={renderAnimeCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.l,
    paddingTop: SPACING.xl + 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.m,
    marginBottom: SPACING.xs,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  count: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  list: {
    padding: SPACING.m,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: SPACING.m,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: 100,
    height: 140,
  },
  info: {
    flex: 1,
    padding: SPACING.m,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  meta: {
    flexDirection: 'row',
    gap: SPACING.m,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  episodes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  episodesText: {
    fontSize: 14,
    color: COLORS.blue,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.l,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.s,
    textAlign: 'center',
  },
});

export default WatchingScreen;
