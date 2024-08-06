import { useEffect } from 'react';
import MovieList from '../../copmponents/MovieList/MovieList';
import css from './HomePage.module.css';

const Home = ({ setUrl, url, data, IMG_LINK, loading }) => {
  useEffect(() => {
    setUrl(url);
  }, [url]);

  return (
    loading && (
      <main className={css.main}>
        <h1>Tranding today</h1>
        {data && <MovieList to={'movies/'} data={data} IMG_LINK={IMG_LINK} />}
      </main>
    )
  );
};

export default Home;
