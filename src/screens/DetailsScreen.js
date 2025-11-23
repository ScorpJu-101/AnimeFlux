import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, addToWatching, removeFromWatching, addToCompleted, removeFromCompleted } from '../store/moviesSlice';
import { COLORS, SPACING } from '../constants/theme';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsScreen = ({ route, navigation }) => {
  const { anime } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.anime.favorites);
  const watching = useSelector((state) => state.anime.watching);
  const completed = useSelector((state) => state.anime.completed);
  const [showListModal, setShowListModal] = useState(false);

  const isFavorite = favorites.some((a) => a.id === anime.id);
  const isWatching = watching.some((a) => a.id === anime.id);
  const isCompleted = completed.some((a) => a.id === anime.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(anime.id));
    } else {
      dispatch(addFavorite(anime));
    }
  };

  const handleAddToList = (listType) => {
    switch(listType) {
      case 'watching':
        if (isWatching) {
          dispatch(removeFromWatching(anime.id));
        } else {
          dispatch(addToWatching(anime));
          // Remove from completed if adding to watching
          if (isCompleted) {
            dispatch(removeFromCompleted(anime.id));
          }
        }
        break;
      case 'completed':
        if (isCompleted) {
          dispatch(removeFromCompleted(anime.id));
        } else {
          dispatch(addToCompleted(anime));
          // Remove from watching if adding to completed
          if (isWatching) {
            dispatch(removeFromWatching(anime.id));
          }
        }
        break;
    }
    setShowListModal(false);
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
          style={styles.bannerOverlay}
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
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={toggleFavorite} style={styles.favButton}>
                <Feather
                  name={isFavorite ? "heart" : "heart"}
                  size={24}
                  color={isFavorite ? COLORS.error : COLORS.textSecondary}
                  fill={isFavorite ? COLORS.error : 'none'}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setShowListModal(true)} 
                style={styles.listButton}
              >
                <Feather name="plus" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Status Badges */}
        {(isWatching || isCompleted) && (
          <View style={styles.statusBadges}>
            {isWatching && (
              <View style={[styles.statusBadge, { backgroundColor: COLORS.blue }]}>
                <Feather name="tv" size={14} color={COLORS.white} />
                <Text style={styles.statusBadgeText}>Watching</Text>
              </View>
            )}
            {isCompleted && (
              <View style={[styles.statusBadge, { backgroundColor: COLORS.green }]}>
                <Feather name="check-circle" size={14} color={COLORS.white} />
                <Text style={styles.statusBadgeText}>Completed</Text>
              </View>
            )}
          </View>
        )}

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

      {/* Add to List Modal */}
      <Modal
        visible={showListModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowListModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowListModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add to List</Text>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => handleAddToList('watching')}
            >
              <View style={styles.modalOptionLeft}>
                <Feather name="tv" size={24} color={COLORS.blue} />
                <Text style={styles.modalOptionText}>
                  {isWatching ? 'Remove from Watching' : 'Add to Watching'}
                </Text>
              </View>
              {isWatching && <Feather name="check" size={24} color={COLORS.blue} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => handleAddToList('completed')}
            >
              <View style={styles.modalOptionLeft}>
                <Feather name="check-circle" size={24} color={COLORS.green} />
                <Text style={styles.modalOptionText}>
                  {isCompleted ? 'Remove from Completed' : 'Add to Completed'}
                </Text>
              </View>
              {isCompleted && <Feather name="check" size={24} color={COLORS.green} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalCancel}
              onPress={() => setShowListModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
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
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.s,
  },
  favButton: {
    padding: SPACING.s,
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    alignSelf: 'flex-start',
    elevation: 3,
  },
  listButton: {
    padding: SPACING.s,
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    alignSelf: 'flex-start',
    elevation: 3,
  },
  statusBadges: {
    flexDirection: 'row',
    gap: SPACING.s,
    marginBottom: SPACING.m,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    gap: SPACING.xs,
  },
  statusBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.l,
    paddingBottom: SPACING.xl,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.l,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.m,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: SPACING.s,
  },
  modalOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.m,
  },
  modalOptionText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  modalCancel: {
    padding: SPACING.m,
    alignItems: 'center',
    marginTop: SPACING.s,
  },
  modalCancelText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});

export default DetailsScreen;
