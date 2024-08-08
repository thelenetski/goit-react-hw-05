import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import { useLocation } from 'react-router-dom';

const Home = ({ setUrl, url, data, IMG_LINK }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUrl(url)
      .then(() => {
        setLoading(true);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [url]);

  return (
    loading && (
      <main className={css.main}>
        <h1>Tranding today</h1>
        {data && (
          <MovieList
            to={'movies/'}
            data={data}
            IMG_LINK={IMG_LINK}
            state={location}
          />
        )}
      </main>
    )
  );
};

export default Home;
