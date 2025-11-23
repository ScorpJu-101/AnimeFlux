import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      SecureStore.deleteItemAsync('userSession');
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    restoreToken: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isLoading = false;
    }
  },
});

export const { loginSuccess, logout, setLoading, restoreToken } = authSlice.actions;
export default authSlice.reducer;
