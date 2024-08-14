import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import css from './NowPlaying.module.css';
import dataRequest from '../../../../components/Services/Services';
import Loader from '../../../../components/Loader/Loader';
import MovieList from '../../../../components/MovieList/MovieList';

const NowPlaying = () => {
  const URL = `https://api.themoviedb.org/3/movie/now_playing?language=uk-UA`;

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
        <MovieList data={data} state={'/movies/nowplaying'} />
      )}
    </>
  );
};

export default NowPlaying;
