import { createSlice } from '@reduxjs/toolkit';
import { fetchFavMovies, addFavMovie, deleteFavMovie } from './moviesOps';

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
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    changeItems(state, action) {
      state.items = action.payload;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      /*Favorites redusers*/
      .addCase(fetchFavMovies.pending, handlePending)
      .addCase(fetchFavMovies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFavMovies.rejected, handleRejected)
      .addCase(addFavMovie.pending, handlePending)
      .addCase(addFavMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addFavMovie.rejected, handleRejected)
      .addCase(deleteFavMovie.pending, handlePending)
      .addCase(deleteFavMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          item => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteFavMovie.rejected, handleRejected);
  },
});

export const favMoviesReducer = favMoviesSlice.reducer;
