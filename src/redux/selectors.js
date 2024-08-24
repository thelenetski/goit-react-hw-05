export const selectMovies = state => state.movies.items;

export const selectOutlet = state => state.movies.outlet;

export const selectLoading = state => state.movies.loading;

export const selectError = state => state.movies.error;

export const selectFavMovies = state => state.favmovies.favitems;

export const selectPage = state => state.movies.page;

export const selectPagesNav = state => state.movies.showPagesNav;

export const selectTotalPages = state => state.movies.totalPages;

export const selectSearch = (state, initialSearch) => {
  return initialSearch || state.movies.search;
};
