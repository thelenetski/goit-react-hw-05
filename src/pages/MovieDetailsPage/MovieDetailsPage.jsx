import { useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense, useRef } from 'react';
import css from './MovieDetailsPage.module.css';
import BackLink from '../../components/BackLink/BackLink';
import { IMG_LINK } from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import { FaRegFileImage } from 'react-icons/fa';
import clsx from 'clsx';
import FavButton from '../../components/FavButton/FavButton';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectMovies,
  selectFavMovies,
} from '../../redux/selectors';
import {
  fetchMovies,
  fetchFavMovies,
  addFavMovie,
  deleteFavMovie,
} from '../../redux/moviesOps';
import toast, { Toaster } from 'react-hot-toast';
import { changeItems, changePagesNav } from '../../redux/moviesSlice';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const buildRateClass = rate => {
  return clsx(
    rate < 59 && css.rateBad,
    (rate < 70 && css.rateNorm) || (rate > 69 && css.rateNice)
  );
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const data = useSelector(selectMovies);
  const favData = useSelector(selectFavMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}?language=uk-UA`;
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/home');
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    dispatch(changePagesNav(false));
    dispatch(changeItems('outlet'));
    if (!favData || favData.length === 0) {
      dispatch(fetchFavMovies());
    }
    favData.some(item => item.favId === movieId) && setIsFav(true);
  }, [favData]);

  useEffect(() => {
    dispatch(changeItems('items'));
    dispatch(fetchMovies(URL));
  }, [dispatch, URL]);

  const handlerAddFav = () => {
    if (favData.length > 98) {
      toast.error('Список обраного переповнений');
      return;
    }
    favData.forEach(item => {
      if (item.favId === movieId) {
        dispatch(deleteFavMovie(item.id));
        setIsFav(false);
        return;
      }
      setIsFav(false);
      return;
    });
    if (!favData.some(item => item.favId === movieId)) addFav();
  };

  const addFav = () => {
    dispatch(
      addFavMovie({
        poster_path: [data.poster_path],
        title: [data.title],
        status: true,
        favId: movieId,
      })
    );
    setIsFav(true);
  };

  return (
    <main className={css.mainMovie}>
      {loading.main && !error && <Loader />}
      {!loading.main && data.id && (
        <>
          <div className={css.controls}>
            <BackLink to={backLinkHref.current}>Назад</BackLink>
            <div>
              <Toaster position="top-left" reverseOrder={true} />
            </div>
            <FavButton onAdd={handlerAddFav}>
              {isFav ? `Прибрати` : `Додати`}
              <FaHeart className={clsx(isFav && css.favactive)} />
            </FavButton>
          </div>
          <div className={css.detailsWrap}>
            {data.poster_path ? (
              <img
                src={IMG_LINK + data.poster_path}
                alt={data.original_title}
                className={css.moviePoster}
              />
            ) : (
              <FaRegFileImage className={css.posterSVG} />
            )}

            <div className={css.movieDescription}>
              <h2>{data.title}</h2>
              <span className={css.original_title}>
                Оригінальна назва: {data.original_title}
              </span>
              <span>
                Рейтинг:{' '}
                <span
                  className={buildRateClass(Math.round(data.vote_average * 10))}
                >
                  {Math.round(data.vote_average * 10)}%
                </span>
              </span>
              <span>Дата: {data.release_date}</span>
              <div className={css.country}>
                {data.production_countries.length > 0 && (
                  <>
                    <span>Країна: </span>
                    {data.production_countries.map((item, index) => {
                      return (
                        <span key={index}>
                          {item.name}
                          {index + 1 < data.production_countries.length && `, `}
                        </span>
                      );
                    })}
                  </>
                )}
              </div>
              {data.overview && (
                <>
                  <h4>Огляд</h4>
                  <p>{data.overview}</p>
                </>
              )}
              <h4>Жанри</h4>
              <div className={css.genresBox}>
                {data.genres.map(item => {
                  return <p key={item.id}>{item.name}</p>;
                })}
              </div>
            </div>
            <div className={css.addInfo}>
              <h4>Додаткова інформація</h4>
              <ul>
                <li>
                  <NavLink to="cast" className={buildLinkClass}>
                    Актори
                  </NavLink>
                </li>
                <li>
                  <NavLink to="reviews" className={buildLinkClass}>
                    Відгуки
                  </NavLink>
                </li>
                <li>
                  <NavLink to="images" className={buildLinkClass}>
                    Кадри
                  </NavLink>
                </li>
                <li>
                  <NavLink to="videos" className={buildLinkClass}>
                    Відео
                  </NavLink>
                </li>
              </ul>

              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default MovieDetailsPage;
