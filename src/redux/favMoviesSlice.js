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
  // extraReducers: builder => {
  //   builder
  //     /*Favorites redusers*/
  //     .addCase(fetchFavMovies.pending, handlePending)
  //     .addCase(fetchFavMovies.fulfilled, (state, action) => {
  //       state.favitems = action.payload.reverse();
  //       state.loading = false;
  //       state.error = null;
  //     })
  //     .addCase(fetchFavMovies.rejected, handleRejected)
  //     .addCase(addFavMovie.pending, handlePending)
  //     .addCase(addFavMovie.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.error = null;
  //       state.favitems.push(action.payload);
  //     })
  //     .addCase(addFavMovie.rejected, handleRejected)
  //     .addCase(deleteFavMovie.pending, handlePending)
  //     .addCase(deleteFavMovie.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.error = null;
  //       const index = state.favitems.findIndex(
  //         item => item.id === action.payload.id
  //       );

  //       if (index !== -1) {
  //         state.favitems.splice(index, 1); // Удаление элемента по индексу
  //       }
  //     })
  //     .addCase(deleteFavMovie.rejected, handleRejected)
  //     .addCase(toggleWatch.pending, handlePending)
  //     .addCase(toggleWatch.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.error = null;
  //       const index = state.favitems.findIndex(
  //         item => item.id === action.payload.id
  //       );

  //       if (index !== -1) {
  //         state.favitems[index] = action.payload;
  //       }
  //     })
  //     .addCase(toggleWatch.rejected, handleRejected);
  // },
});

export const { addFavMovie, deleteFavMovie, toggleWatch } =
  favMoviesSlice.actions;
export const favMoviesReducer = favMoviesSlice.reducer;
