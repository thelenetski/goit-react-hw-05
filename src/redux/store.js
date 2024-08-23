import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from './moviesSlice';
import { favMoviesReducer } from './favMoviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favmovies: favMoviesReducer,
  },
});
