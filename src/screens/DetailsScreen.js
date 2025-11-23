import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/moviesSlice';
import { COLORS, SPACING } from '../constants/theme';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsScreen = ({ route, navigation }) => {
  const { anime } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.anime.favorites);
  const isFavorite = favorites.some((a) => a.id === anime.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(anime.id));
    } else {
      dispatch(addFavorite(anime));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: anime.bannerImage || anime.poster_path }}
          style={styles.banner}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', COLORS.background]}
          style={styles.bannerGradient}
        />
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.posterRow}>
          <Image
            source={{ uri: anime.poster_path }}
            style={styles.poster}
            resizeMode="cover"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{anime.title}</Text>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favButton}>
              <Feather
                name={isFavorite ? "heart" : "heart"}
                size={28}
                color={isFavorite ? COLORS.error : COLORS.textSecondary}
                fill={isFavorite ? COLORS.error : 'none'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.metaContainer}>
          {anime.release_date !== 'N/A' && (
            <View style={styles.badge}>
              <Feather name="calendar" size={14} color={COLORS.accent2} />
              <Text style={styles.metaText}>{anime.release_date}</Text>
            </View>
          )}
          <View style={styles.badge}>
            <Feather name="star" size={14} color={COLORS.gold} />
            <Text style={styles.metaText}>{anime.vote_average.toFixed(1)}/10</Text>
          </View>
          {anime.episodes && (
            <View style={styles.badge}>
              <Feather name="play-circle" size={14} color={COLORS.blue} />
              <Text style={styles.metaText}>{anime.episodes} eps</Text>
            </View>
          )}
          {anime.status && (
            <View style={[styles.badge, styles.statusBadge]}>
              <Text style={styles.statusText}>{anime.status}</Text>
            </View>
          )}
        </View>

        {anime.genres && anime.genres.length > 0 && (
          <View style={styles.genresSection}>
            <Text style={styles.sectionTitle}>Genres</Text>
            <View style={styles.genresContainer}>
              {anime.genres.map((genre, index) => (
                <View key={index} style={styles.genreChip}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Synopsis</Text>
        <Text style={styles.overview}>{anime.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: SPACING.xl,
  },
  imageContainer: {
    position: 'relative',
  },
  banner: {
    width: '100%',
    height: 250,
  },
  bannerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  detailsContainer: {
    padding: SPACING.m,
    marginTop: -60,
  },
  posterRow: {
    flexDirection: 'row',
    marginBottom: SPACING.m,
    gap: SPACING.m,
  },
  poster: {
    width: 120,
    height: 170,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  favButton: {
    padding: SPACING.s,
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    alignSelf: 'flex-start',
    elevation: 3,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.m,
    gap: SPACING.s,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    elevation: 2,
  },
  statusBadge: {
    backgroundColor: COLORS.green,
  },
  metaText: {
    marginLeft: SPACING.xs,
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  genresSection: {
    marginBottom: SPACING.m,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.s,
    marginTop: SPACING.s,
  },
  genreChip: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
  },
  genreText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.s,
    marginTop: SPACING.s,
  },
  overview: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});

export default DetailsScreen;
