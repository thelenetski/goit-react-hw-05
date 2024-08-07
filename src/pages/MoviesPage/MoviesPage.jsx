import { useState, useEffect } from 'react';
import SearchBar from '../../copmponents/SearchBar/SearchBar';
import MovieList from '../../copmponents/MovieList/MovieList';
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
      setUrl(URL)
        .then(data => {
          setData(data);
          setLoading(true);
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
