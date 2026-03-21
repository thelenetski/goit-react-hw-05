import { createSlice } from '@reduxjs/toolkit';

// const handlePending = state => {
//   state.loading = true;
// };

// const handleRejected = (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// };

const favMoviesSlice = createSlice({
  name: 'favmovies',
  initialState: {
    favitems: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFavMovie: (state, action) => {
      state.favitems.push(action.payload);
    },
    deleteFavMovie: (state, action) => {
      const index = state.favitems.findIndex(
        item => item.id === action.payload
      );

      if (index !== -1) {
        state.favitems.splice(index, 1);
      }
    },
    toggleWatch: (state, action) => {
      const index = state.favitems.findIndex(
        item => item.id === action.payload.id
      );
      if (index !== -1) {
        state.favitems[index] = action.payload;
      }
    },
  },
});

export const { addFavMovie, deleteFavMovie, toggleWatch } =
  favMoviesSlice.actions;
export const favMoviesReducer = favMoviesSlice.reducer;
