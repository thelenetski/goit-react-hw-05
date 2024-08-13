import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './FavPage.module.css';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const Home = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const results = JSON.parse(localStorage.getItem('favorite'));
    setData(results);
    setLoading(false);
  }, []);

  return (
    <>
      <main className={css.main}>
        <h1>Список обраних фільмів</h1>
        {loading && <Loader />}
        {!loading && <MovieList data={data} state={location} />}
      </main>
    </>
  );
};

export default Home;
