import MovieList from '../../components/MovieList/MovieList';
import css from './FavPage.module.css';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { selectError, selectLoading } from '../../redux/selectors';
import { useSelector } from 'react-redux';

const FavPage = () => {
  const location = useLocation();
  const loading = useSelector(selectLoading);
  const error = useLocation(selectError);
  const results = JSON.parse(localStorage.getItem('favorite'));

  return (
    <>
      <main className={css.main}>
        <h1>
          {results !== null && results.length > 0
            ? `Мої фільми`
            : `Немає обраних фільмів`}
        </h1>
        {loading.main && !error && <Loader />}
        {!loading.main && <MovieList results={results} state={location} />}
      </main>
    </>
  );
};

export default FavPage;
