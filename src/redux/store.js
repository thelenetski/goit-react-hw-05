import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from './moviesSlice';
import { favMoviesReducer } from './favMoviesSlice';
import storage from 'redux-persist/es/storage';

const globalPersistConfig = {
  key: 'global',
  storage,
  whitelist: ['filters', 'cart'],
};

console.log(globalPersistConfig);

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favmovies: favMoviesReducer,
  },
});
