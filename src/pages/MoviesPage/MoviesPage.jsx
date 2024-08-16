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
import dataRequest from '../../components/Services/Services';
import { genres } from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import css from './MoviesPage.module.css';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? '';
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(movieName ?? '');
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams({
    query: search,
  });

  const URL = `https://api.themoviedb.org/3/search/movie?${params}`;

  useEffect(() => {
    if (search === '') return;
    const requestData = async () => {
      try {
        setLoading(true);
        const { results } = await dataRequest(URL);
        checkSearchData(results);
        setData(results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    requestData();
  }, [search]);

  const handleSearch = query => {
    if (query === search) {
      return toast.error('This request already done, try another one');
    }
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
    setSearch(query);
    navigate(`/movies?query=${query}`, { replace: true });
  };

  const checkSearchData = data => {
    data.length === 0 && toast.error('Nothing found, try another one');
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
                      onClick={() => {
                        setData(null);
                      }}
                      className={buildLinkClass}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {loading && <Loader />}
        {loading === false && data !== null && (
          <MovieList data={data} state={location} />
        )}
        <Suspense fallback={<div>Завантаження...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default MoviesPage;
