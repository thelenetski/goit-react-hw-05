import MovieList from '../../components/MovieList/MovieList';
import css from './FavPage.module.css';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import {
  selectError,
  selectFavMovies,
  selectLoading,
} from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavMovies } from '../../redux/moviesOps';
import { useEffect } from 'react';
import { changePagesNav, setPage } from '../../redux/moviesSlice';

const FavPage = () => {
  const location = useLocation();
  const loading = useSelector(selectLoading);
  const error = useLocation(selectError);
  const results = useSelector(selectFavMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(1));
    dispatch(changePagesNav(false));
    dispatch(fetchFavMovies());
  }, [dispatch]);

  const onChangeData = data => {
    const newData = data.map(item => {
      return {
        ...item,
        id: item.favId,
      };
    });
    return newData;
  };

  const sumFavMovies = res => {
    const sum = res.reduce(
      (accumulator, item) => (item.status ? accumulator + 1 : accumulator),
      0
    );
    return sum;
  };
  // console.log(results);

  return (
    <>
      <main className={css.main}>
        <h1>
          {results !== null && results.length > 0
            ? `Мої фільми (${sumFavMovies(results)})`
            : `Немає обраних фільмів`}
        </h1>
        {loading.main && !error && <Loader />}
        {!loading.main && results.length > 0 && (
          <MovieList results={onChangeData(results)} state={location} />
        )}
      </main>
    </>
  );
};

export default FavPage;
