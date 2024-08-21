import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import MovieList from '../MovieList/MovieList';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectOutlet,
} from '../../redux/selectors';
import { fetchOutlet } from '../../redux/moviesOps';

const MovieCat = () => {
  const location = useLocation();
  const { catName } = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector(selectOutlet);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const URL = `https://api.themoviedb.org/3/discover/movie?include_adult=true&language=uk-UA&page=${page}&sort_by=popularity.desc&with_genres=${catName.match(
    /\d+/g
  )}`;

  useEffect(() => {
    dispatch(fetchOutlet(URL));
  }, [dispatch, URL]);

  return (
    <>
      {loading.outlet && !error && <Loader />}
      {!loading.outlet && data.results && (
        <>
          <MovieList results={data.results} state={location} />
          <div className="navePageWrap">
            {page > 1 && (
              <div className="navPage">
                <button type="button" onClick={() => setPage(page - 1)}>
                  <GrFormPrevious />
                </button>
              </div>
            )}
            {page < data.total_pages && (
              <div className="navPage">
                <button type="button" onClick={() => setPage(page + 1)}>
                  <GrFormNext />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MovieCat;
