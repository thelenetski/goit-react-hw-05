import { useEffect, Suspense } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  selectError,
  selectPage,
  selectSearch,
  selectFilteredMovies,
} from '../../redux/selectors';
import { fetchFavMovies, fetchMovies } from '../../redux/moviesOps';
import {
  changeItems,
  changePagesNav,
  setPage,
  setSearch,
} from '../../redux/moviesSlice';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? '';
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filteredData = useSelector(selectFilteredMovies);
  const search = useSelector(state => selectSearch(state, movieName));
  const location = useLocation();
  const navigate = useNavigate();
  const page = useSelector(selectPage);
  const params = new URLSearchParams({
    language: 'uk-UA',
    query: search,
    page,
  });

  const url = `https://api.themoviedb.org/3/search/movie?${params}`;

  useEffect(() => {
    dispatch(changeItems('items'));
    dispatch(changePagesNav(false));
    search !== '' &&
      location.pathname === '/movies' &&
      dispatch(fetchMovies(url));
    dispatch(fetchFavMovies());
    onQueryPageParams(search, page);
  }, [dispatch, page, search, url]);

  const handleSearch = query => {
    if (query === search) {
      return toast.error('Спробуйте інший запит');
    }
    dispatch(setPage(1));
    dispatch(setSearch(query));
    navigate(`/movies?query=${query}`, { replace: true });
  };

  const onQueryPageParams = (query, page) => {
    page !== 1
      ? setSearchParams(query !== '' ? { query, page } : { page })
      : setSearchParams(query !== '' && { query });
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
                      to={`${item.id}-${item.originalName.toLocaleLowerCase()}`}
                      className={buildLinkClass}
                      onClick={() => {
                        dispatch(setPage(1));
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
        {!loading.main && filteredData && (
          <>
            {search !== '' && filteredData.length === 0 && (
              <h4>Нічого не знайдено</h4>
            )}
            {page > 1 && (
              <h4 className="pageCounter">{`- Сторінка ${page} -`}</h4>
            )}
            <MovieList
              link={'search-article'}
              results={filteredData}
              state={location}
            />
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
