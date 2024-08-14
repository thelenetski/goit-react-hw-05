import { useState, useEffect } from 'react';
import dataRequest from '../../../../components/Services/Services';
import Loader from '../../../../components/Loader/Loader';
import MovieList from '../../../../components/MovieList/MovieList';

const Populars = () => {
  const URL = `https://api.themoviedb.org/3/movie/popular?language=uk-UA`;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <>
      {loading && <Loader />}
      {loading === false && data !== null && (
        <MovieList data={data} state={'/movies/populars'} />
      )}
    </>
  );
};

export default Populars;
