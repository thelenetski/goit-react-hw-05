import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFavMovies,
  addFavMovie,
  deleteFavMovie,
  toggleWatch,
} from './moviesOps';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const favMoviesSlice = createSlice({
  name: 'favmovies',
  initialState: {
    favitems: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      /*Favorites redusers*/
      .addCase(fetchFavMovies.pending, handlePending)
      .addCase(fetchFavMovies.fulfilled, (state, action) => {
        state.favitems = action.payload.reverse();
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFavMovies.rejected, handleRejected)
      .addCase(addFavMovie.pending, handlePending)
      .addCase(addFavMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favitems.push(action.payload);
      })
      .addCase(addFavMovie.rejected, handleRejected)
      .addCase(deleteFavMovie.pending, handlePending)
      .addCase(deleteFavMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.favitems.findIndex(
          item => item.id === action.payload.id
        );
        state.favitems.splice(index, 1);
      })
      .addCase(deleteFavMovie.rejected, handleRejected)
      .addCase(toggleWatch.pending, handlePending)
      .addCase(toggleWatch.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.favitems.findIndex(
          item => item.id === action.payload.id
        );
        state.favitems.splice(index, 1, action.payload);
      })
      .addCase(toggleWatch.rejected, handleRejected);
  },
});

export const favMoviesReducer = favMoviesSlice.reducer;
