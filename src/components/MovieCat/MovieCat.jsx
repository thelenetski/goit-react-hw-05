import { useState, useEffect } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') ?? 1);
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
    dispatch(fetchOutlet(URL));
    if (searchParams.get('page') === null) setPage(1);
  }, [dispatch, URL, page]);

  const onQueryPageParams = page => {
    setSearchParams(page !== 1 ? { page } : {});
  };

  return (
    <>
      {loading.outlet && !error && <Loader />}
      {!loading.outlet && data.results && (
        <>
          <MovieList results={data.results} state={location} />
          <div className="navePageWrap">
            {page > 1 && (
              <div className="navPage">
                <button
                  type="button"
                  onClick={() => {
                    setPage(parseInt(page) - 1);
                    onQueryPageParams(parseInt(page) - 1);
                  }}
                >
                  <GrFormPrevious />
                </button>
              </div>
            )}
            {page < data.total_pages && (
              <div className="navPage">
                <button
                  type="button"
                  onClick={() => {
                    setPage(parseInt(page) + 1);
                    onQueryPageParams(parseInt(page) + 1);
                  }}
                >
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
