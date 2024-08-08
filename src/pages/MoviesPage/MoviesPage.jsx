import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useSearchParams } from 'react-router-dom';

const MoviePage = ({ setUrl, IMG_LINK }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('querry') ?? '';
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    results: [],
  });
  const [search, setSearch] = useState(movieName ?? '');
  const location = useLocation();

  const params = new URLSearchParams({
    query: search,
  });

  const URL = `https://api.themoviedb.org/3/search/movie?${params}`;

  useEffect(() => {
    try {
      search !== '' &&
        setUrl(URL)
          .then(data => {
            setData(data);
            setLoading(true);
            checkSearchData(data);
          })
          .catch(error => {
            console.log(error.message);
          });
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const handleSearch = querry => {
    if (querry === search) {
      return toast.error('This request already done, try another one');
    }
    setData({
      results: [],
    });
    const nextParams = querry !== '' ? { querry } : {};
    setSearchParams(nextParams);
    setSearch(querry);
  };

  const checkSearchData = data => {
    data.results.length < 1 && toast.error('Nothing found, try another one');
  };

  return (
    <>
      <SearchBar value={movieName} onSubmit={handleSearch} />
      <div>
        <Toaster position="top-left" reverseOrder={true} />
      </div>
      {loading && (
        <MovieList data={data} IMG_LINK={IMG_LINK} state={location} />
      )}
    </>
  );
};

export default MoviePage;
