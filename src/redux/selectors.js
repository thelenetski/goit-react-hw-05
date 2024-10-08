import { createSelector } from '@reduxjs/toolkit';

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

export const selectBG = state => state.movies.bg;

/*------------------------------------------------------*/

export const selectFilteredMovies = createSelector(
  [selectMovies, selectFavMovies],
  (data, favData) => filterData(data, favData)
);

export const selectFilteredOutletMovies = createSelector(
  [selectOutlet, selectFavMovies],
  (data, favData) => filterData(data, favData)
);

const filterData = (data, favData) => {
  const dataArray = data.results ?? data.cast;
  if (dataArray === undefined) return [];
  if (favData === undefined) return [];

  const newRes = dataArray.map(item => {
    const favItem = favData.find(
      favItem => Number(favItem.favId) === Number(item.id)
    );
    return favItem
      ? { ...item, status: favItem.status, isWatch: favItem.isWatch }
      : item;
  });
  return newRes;
};
