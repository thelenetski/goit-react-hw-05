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
    // .addCase(addTask.pending, handlePending)
    // .addCase(addTask.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.items.push(action.payload);
    // })
    // .addCase(addTask.rejected, handleRejected)
    // .addCase(deleteTask.pending, handlePending)
    // .addCase(deleteTask.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   const index = state.items.findIndex(
    //     (task) => task.id === action.payload.id
    //   );
    //   state.items.splice(index, 1);
    // })
    // .addCase(deleteTask.rejected, handleRejected)
    // .addCase(toggleDone.pending, handlePending)
    // .addCase(toggleDone.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   const index = state.items.findIndex(
    //     (task) => task.id === action.payload.id
    //   );
    //   state.items.splice(index, 1, action.payload);
    // })
    // .addCase(toggleDone.rejected, handleRejected);
  },
});

export const { changeItems } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
