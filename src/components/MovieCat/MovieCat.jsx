import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import MovieList from '../MovieList/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectOutlet,
  selectPage,
} from '../../redux/selectors';
import { fetchOutlet } from '../../redux/moviesOps';
import { changeItems, setSearch } from '../../redux/moviesSlice';

const MovieCat = () => {
  const location = useLocation();
  const { catName } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const data = useSelector(selectOutlet);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const params = new URLSearchParams({
    include_adult: 'true',
    language: 'uk-UA',
    page,
    with_genres: catName.match(/\d+/g),
  });

  const URL = `https://api.themoviedb.org/3/discover/movie?${params}`;

  useEffect(() => {
    dispatch(setSearch(''));
    dispatch(changeItems('outlet'));
    dispatch(fetchOutlet(URL));
    dispatch(changeItems('items'));
  }, [dispatch, URL]);

  return (
    <>
      {loading.outlet && !error && <Loader />}
      {!loading.outlet && data.results && (
        <>
          <MovieList results={data.results} state={location} />
        </>
      )}
    </>
  );
};

export default MovieCat;
