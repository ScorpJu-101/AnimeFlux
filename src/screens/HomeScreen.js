import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrendingAnime, searchAnime } from '../services/api';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    loadAnime();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setIsSearching(false);
      loadAnime();
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const loadAnime = async () => {
    try {
      setLoading(true);
      const data = await fetchTrendingAnime();
      setAnime(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (query) => {
    try {
      setIsSearching(true);
      setLoading(true);
      const data = await searchAnime(query);
      setAnime(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

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
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={12} color={COLORS.gold} />
              <Text style={styles.rating}>{item.vote_average.toFixed(1)}</Text>
            </View>
            {item.episodes && (
              <View style={styles.episodeContainer}>
                <Feather name="play-circle" size={12} color={COLORS.blue} />
                <Text style={styles.episodes}>{item.episodes} eps</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading anime...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Otaku'} 🎌</Text>
          <Text style={styles.subtitle}>
            {isSearching ? 'Search results' : 'Discover trending anime'}
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search anime..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Feather name="x" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={anime}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.m,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  header: {
    padding: SPACING.l,
    paddingTop: SPACING.xl + 10,
    backgroundColor: COLORS.primary,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  greeting: {
    fontSize: 24,
    fontFamily: FONTS.poppinsBold,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.white,
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    backgroundColor: COLORS.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: SPACING.m,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 15,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.text,
  },
  clearButton: {
    padding: SPACING.s,
  },
  listContent: {
    padding: SPACING.s,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 260,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: SPACING.m,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: SPACING.s,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.s,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  rating: {
    fontSize: 11,
    color: COLORS.white,
    marginLeft: 4,
    fontWeight: '600',
  },
  episodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  episodes: {
    fontSize: 11,
    color: COLORS.white,
    marginLeft: 4,
    fontWeight: '600',
  },
});

export default HomeScreen;
