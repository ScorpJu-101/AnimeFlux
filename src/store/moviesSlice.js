import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favorites: [],
};

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      const anime = action.payload;
      if (!state.favorites.find((a) => a.id === anime.id)) {
        state.favorites.push(anime);
        AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      const animeId = action.payload;
      state.favorites = state.favorites.filter((a) => a.id !== animeId);
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = animeSlice.actions;
export default animeSlice.reducer;
