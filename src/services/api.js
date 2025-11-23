import axios from 'axios';

// AniList GraphQL API
const ANILIST_API = 'https://graphql.anilist.co';

// GraphQL query for trending anime
const TRENDING_ANIME_QUERY = `
query {
  Page(page: 1, perPage: 20) {
    media(type: ANIME, sort: TRENDING_DESC) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
        extraLarge
      }
      bannerImage
      description
      averageScore
      episodes
      genres
      seasonYear
      status
      format
    }
  }
}
`;

// Transform AniList data to our app format
const transformAnimeData = (animeList) => {
  return animeList.map(anime => ({
    id: anime.id,
    title: anime.title.english || anime.title.romaji,
    overview: anime.description ? anime.description.replace(/<[^>]*>/g, '') : 'No description available',
    poster_path: anime.coverImage.extraLarge || anime.coverImage.large,
    bannerImage: anime.bannerImage,
    vote_average: anime.averageScore ? anime.averageScore / 10 : 0,
    release_date: anime.seasonYear ? anime.seasonYear.toString() : 'N/A',
    episodes: anime.episodes,
    genres: anime.genres,
    status: anime.status,
    format: anime.format,
  }));
};

export const fetchTrendingAnime = async () => {
  try {
    const response = await axios.post(ANILIST_API, {
      query: TRENDING_ANIME_QUERY,
    });
    
    const animeList = response.data.data.Page.media;
    return transformAnimeData(animeList);
  } catch (error) {
    console.error('Error fetching anime:', error);
    // Fallback to empty array on error
    return [];
  }
};

export const loginUser = async (email, password) => {
  // Mock login - extracts name from email for demo purposes
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        // Extract name from email (part before @)
        const username = email.split('@')[0];
        // Capitalize first letter
        const displayName = username.charAt(0).toUpperCase() + username.slice(1);
        
        resolve({
          id: '123',
          name: displayName,
          email: email,
          token: 'dummy-jwt-token',
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1500);
  });
};

export const registerUser = async (name, email, password) => {
  // Mock registration - store user data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name && email && password) {
        // In a real app, this would save to a database
        // For now, we'll just resolve successfully
        resolve({
          id: Date.now().toString(),
          name: name,
          email: email,
          token: 'dummy-jwt-token',
        });
      } else {
        reject(new Error('All fields are required'));
      }
    }, 1500);
  });
};
