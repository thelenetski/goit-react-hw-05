import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from './moviesSlice';
import { favMoviesReducer } from './favMoviesSlice';
import storage from 'redux-persist/es/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const favMoviesPersistConfig = {
  key: 'favmovies',
  storage,
  whitelist: ['favitems'],
};

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favmovies: persistReducer(favMoviesPersistConfig, favMoviesReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
