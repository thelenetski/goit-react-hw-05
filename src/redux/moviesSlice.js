import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies, fetchOutlet } from './moviesOps';

const handlePending = state => {
  state.loading = { main: true, outlet: false };
};

const handleRejected = (state, action) => {
  state.loading = { main: false, outlet: false };
  state.error = action.payload;
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    outlet: [],
    loading: { main: false, outlet: false },
    error: null,
  },
  reducers: {
    changeItems(state, action) {
      state.items = action.payload;
      state.loading = { main: false, outlet: false };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, handlePending)
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = { main: false, outlet: false };
        state.error = null;
      })
      .addCase(fetchMovies.rejected, handleRejected)
      .addCase(fetchOutlet.pending, state => {
        state.loading = { main: false, outlet: true };
      })
      .addCase(fetchOutlet.fulfilled, (state, action) => {
        state.outlet = action.payload;
        state.loading = { main: false, outlet: false };
        state.error = null;
      })
      .addCase(fetchOutlet.rejected, handleRejected);
  },
});

export const { changeItems } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
