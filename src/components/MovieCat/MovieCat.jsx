import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import dataRequest from '../Services/Services';
import Loader from '../Loader/Loader';
import MovieList from '../MovieList/MovieList';

const MovieCat = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { catName } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${catName}?language=uk-UA`;

  useEffect(() => {
    const requestData = async () => {
      try {
        setLoading(true);
        const { results } = await dataRequest(URL);
        setData(results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    requestData();
  }, [catName]);

  return (
    <>
      {loading && <Loader />}
      {loading === false && data !== null && (
        <MovieList data={data} state={location} />
      )}
    </>
  );
};

export default MovieCat;
