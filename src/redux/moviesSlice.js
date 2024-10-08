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
    page: 1,
    showPagesNav: false,
    totalPages: 0,
    search: '',
    bg: '',
  },
  reducers: {
    changeItems(state, action) {
      action.payload === 'items' && (state.items = []);
      action.payload === 'outlet' && (state.outlet = []);
      if (action.payload !== 'items' && action.payload !== 'outlet')
        state.items = action.payload;
      // state.loading = { main: true, outlet: true };
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    nextPage(state) {
      state.page = state.page + 1;
    },
    prevPage(state, action) {
      action.payload
        ? (state.page = action.payload)
        : (state.page = state.page - 1);
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    changePagesNav(state, action) {
      state.showPagesNav = action.payload;
    },
    changeBG(state, action) {
      state.bg = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, handlePending)
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalPages = action.payload.total_pages;
        state.loading = { main: false, outlet: false };
        state.error = null;
      })
      .addCase(fetchMovies.rejected, handleRejected)
      .addCase(fetchOutlet.pending, state => {
        state.loading.outlet = true;
      })
      .addCase(fetchOutlet.fulfilled, (state, action) => {
        state.outlet = action.payload;
        state.totalPages = action.payload.total_pages;
        state.loading = { main: false, outlet: false };
        state.error = null;
      })
      .addCase(fetchOutlet.rejected, handleRejected);
  },
});

export const {
  changeItems,
  nextPage,
  prevPage,
  setPage,
  changePagesNav,
  setSearch,
  changeBG,
} = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
