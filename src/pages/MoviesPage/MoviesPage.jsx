import { useState, useEffect, Suspense } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import {
  useLocation,
  useSearchParams,
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { genres } from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import css from './MoviesPage.module.css';
import clsx from 'clsx';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMovies,
  selectLoading,
  selectError,
} from '../../redux/selectors';
import { fetchMovies } from '../../redux/moviesOps';
import { changeItems } from '../../redux/moviesSlice';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? '';
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const data = useSelector(selectMovies);
  const [search, setSearch] = useState(movieName ?? '');
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(searchParams.get('page') ?? 1);

  const params = new URLSearchParams({
    query: search,
    page: parseInt(page),
  });

  const url = `https://api.themoviedb.org/3/search/movie?${params}`;

  useEffect(() => {
    if (search === '') return;
    dispatch(fetchMovies(url));
  }, [dispatch, url, page]);

  const handleSearch = query => {
    if (query === search) {
      return toast.error('Спробуйте інший запит');
    }
    onQueryPageParams(query, page);
    setSearch(query);
    navigate(`/movies?query=${query}`, { replace: true });
  };

  const onQueryPageParams = (query, page) => {
    setSearchParams(query !== '' ? { query, page } : { page });
  };

  return (
    <>
      <main className={css.main}>
        <div>
          <Toaster position="top-left" reverseOrder={true} />
        </div>
        <div className={css.searchCatsBox}>
          <SearchBar value={movieName} onSubmit={handleSearch} />
          <div className={css.cats}>
            <ul>
              {genres.map(item => {
                return (
                  <li key={item.id}>
                    <NavLink
                      to={`${item.id}-${item.name.toLocaleLowerCase()}`}
                      className={buildLinkClass}
                      onClick={() => {
                        dispatch(changeItems([]));
                      }}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {loading.main && !error && <Loader />}
        {data.results && (
          <>
            {data.results.length === 0 && <h4>Нічого не знайдено</h4>}
            <MovieList
              link={'search-article'}
              results={data.results}
              state={location}
            />
            <div className="navePageWrap">
              {page > 1 && (
                <div className="navPage">
                  <button
                    type="button"
                    onClick={() => {
                      setPage(page - 1);
                      onQueryPageParams(search, page - 1);
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
                      setPage(page + 1);
                      onQueryPageParams(search, page + 1);
                    }}
                  >
                    <GrFormNext />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default MoviesPage;
