import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import animeReducer from './moviesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    anime: animeReducer,
  },
});
