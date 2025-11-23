import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favorites: [],
  watching: [],
  completed: [],
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
    setWatching: (state, action) => {
      state.watching = action.payload;
    },
    addToWatching: (state, action) => {
      const anime = action.payload;
      if (!state.watching.find((a) => a.id === anime.id)) {
        state.watching.push(anime);
        AsyncStorage.setItem('watching', JSON.stringify(state.watching));
      }
    },
    removeFromWatching: (state, action) => {
      const animeId = action.payload;
      state.watching = state.watching.filter((a) => a.id !== animeId);
      AsyncStorage.setItem('watching', JSON.stringify(state.watching));
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    addToCompleted: (state, action) => {
      const anime = action.payload;
      if (!state.completed.find((a) => a.id === anime.id)) {
        state.completed.push(anime);
        AsyncStorage.setItem('completed', JSON.stringify(state.completed));
      }
    },
    removeFromCompleted: (state, action) => {
      const animeId = action.payload;
      state.completed = state.completed.filter((a) => a.id !== animeId);
      AsyncStorage.setItem('completed', JSON.stringify(state.completed));
    },
  },
});

export const { 
  setFavorites, 
  addFavorite, 
  removeFavorite,
  setWatching,
  addToWatching,
  removeFromWatching,
  setCompleted,
  addToCompleted,
  removeFromCompleted,
} = animeSlice.actions;
export default animeSlice.reducer;
