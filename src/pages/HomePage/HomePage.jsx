import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import { useLocation } from 'react-router-dom';
import dataRequest, { TREND_URL } from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';

const Home = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const requestData = async () => {
      try {
        setLoading(true);
        const { results } = await dataRequest(TREND_URL);
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
      <main className={css.main}>
        <h1>Сьогодні у тренді</h1>
        {loading && <Loader />}
        {!loading && <MovieList data={data} state={location} />}
      </main>
    </>
  );
};

export default Home;
