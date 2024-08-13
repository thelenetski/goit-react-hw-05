import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useSearchParams } from 'react-router-dom';
import dataRequest from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('querry') ?? '';
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(movieName ?? '');
  const location = useLocation();

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

  const handleSearch = querry => {
    if (querry === search) {
      return toast.error('This request already done, try another one');
    }
    const nextParams = querry !== '' ? { querry } : {};
    setSearchParams(nextParams);
    setSearch(querry);
  };

  const checkSearchData = data => {
    data.length === 0 && toast.error('Nothing found, try another one');
  };

  return (
    <>
      <main className={css.main}>
        <SearchBar value={movieName} onSubmit={handleSearch} />
        <div>
          <Toaster position="top-left" reverseOrder={true} />
        </div>
        {loading && <Loader />}
        {loading === false && <MovieList data={data} state={location} />}
      </main>
    </>
  );
};

export default MoviesPage;
