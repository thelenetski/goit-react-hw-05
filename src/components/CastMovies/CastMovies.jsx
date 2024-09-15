import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import css from './CastMovies.module.css';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectFilteredOutletMovies,
  selectLoading,
} from '../../redux/selectors';
import { fetchFavMovies, fetchOutlet } from '../../redux/moviesOps';
import MovieList from '../MovieList/MovieList';
import { changePagesNav, setPage } from '../../redux/moviesSlice';

const CastMovies = () => {
  const { castId } = useParams();
  const URL = `https://api.themoviedb.org/3/person/${castId}/movie_credits?language=uk-UA`;
  const filteredData = useSelector(selectFilteredOutletMovies);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const location = useLocation();

  useEffect(() => {
    dispatch(changePagesNav(false));
    dispatch(setPage(1));
    dispatch(fetchOutlet(URL)).then(() => {
      window.scrollTo({
        top: window.scrollY + 300,
        behavior: 'smooth',
      });
    });
    dispatch(fetchFavMovies());
  }, [dispatch, URL]);

  return (
    <>
      {loading.outlet && !error && <Loader />}
      {!loading.outlet && (
        <div className={css.castMoviesBox}>
          <h4
            style={{ fontSize: 16 }}
          >{`- Знайдено ${filteredData.length} -`}</h4>
          <MovieList link={'/castmv'} results={filteredData} state={location} />
        </div>
      )}
    </>
  );
};

export default CastMovies;
