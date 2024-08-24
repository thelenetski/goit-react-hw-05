import { useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import { useLocation } from 'react-router-dom';
import { TREND_URL } from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectMovies,
} from '../../redux/selectors';
import { fetchMovies } from '../../redux/moviesOps';
import { changePagesNav, setPage } from '../../redux/moviesSlice';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const location = useLocation();

  useEffect(() => {
    dispatch(changePagesNav(false));
    dispatch(setPage(1));
    dispatch(fetchMovies(TREND_URL));
  }, [dispatch]);

  return (
    <>
      <main className={css.main}>
        <h1>Сьогодні у тренді</h1>
        {loading.main && !error && <Loader />}
        {!loading.main && <MovieList results={data.results} state={location} />}
      </main>
    </>
  );
};

export default Home;
