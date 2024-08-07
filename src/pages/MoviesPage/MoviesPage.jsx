import { useState, useEffect } from 'react';
import SearchBar from '../../copmponents/SearchBar/SearchBar';
import MovieList from '../../copmponents/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';

const MoviePage = ({ IMG_LINK }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('querry') ?? '';
  const [data, setData] = useState({
    results: [],
  });
  const [search, setSearch] = useState(movieName ?? '');
  const location = useLocation();

  const params = new URLSearchParams({
    query: search,
  });

  useEffect(() => {
    try {
      const dataRequest = async () => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?${params}`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTU4YmVjZWNmNTM4OTQ3N2RlN2E3MmI1ODRkZDViZiIsIm5iZiI6MTcyMjg3MDkzNy4xODc2MzMsInN1YiI6IjYzODVhZjliMmUwNjk3MDI5MmU0YTYyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.504sSMw6xkLbLg9EtJxY9BlIZvH_Gi1hHxNm_ILzwVY',
              accept: 'application/json',
            },
          }
        );
        return response.data;
      };

      dataRequest()
        .then(data => {
          setData(data);
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
      {data && <MovieList data={data} IMG_LINK={IMG_LINK} state={location} />}
    </>
  );
};

export default MoviePage;
