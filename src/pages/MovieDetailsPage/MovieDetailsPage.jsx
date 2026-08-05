import { useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import { useEffect, Suspense, useRef } from 'react';
import css from './MovieDetailsPage.module.css';
import BackLink from '../../components/BackLink/BackLink';
import {
  IMG_LINK,
  IMG_LINK_ORIGINAL,
} from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import { FaRegFileImage, FaHeart } from 'react-icons/fa';
import { IoEyeOutline, IoEye } from 'react-icons/io5';
import clsx from 'clsx';
import FavButton from '../../components/FavButton/FavButton';
import WatchButton from '../../components/WatchButton/WatchButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectMovies,
  selectFavMovies,
} from '../../redux/selectors';
import { fetchMovies } from '../../redux/moviesOps';
import {
  deleteFavMovie,
  toggleWatch,
  addFavMovie,
} from '../../redux/favMoviesSlice';
import { Toaster } from 'react-hot-toast';
import { changeBG, changeItems, changePagesNav } from '../../redux/moviesSlice';

const buildLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

const buildRateClass = rate =>
  clsx(
    rate < 59 && 'rateBad',
    (rate < 70 && 'rateNorm') || (rate > 69 && 'rateNice')
  );

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

  // Находим объект фильма в Redux-сторе
  const movieInStore = favData.find(item => item.favId === movieId);
  const isFav = Boolean(movieInStore?.status);
  const isWatch = Boolean(movieInStore?.isWatch);

  useEffect(() => {
    dispatch(changePagesNav(false));
    dispatch(changeItems('outlet'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeItems('items'));
    dispatch(fetchMovies(URL)).then(() => {
      window.scrollTo(0, 0);
    });
  }, [dispatch, URL]);

  useEffect(() => {
    if (data.backdrop_path) {
      dispatch(changeBG(IMG_LINK_ORIGINAL + data.backdrop_path));
    }
  }, [dispatch, data.backdrop_path]);

  // Обработчик удаления/обновления фильма, если он больше не нужен в сторе
  const handleUpdateOrDelete = updatedFields => {
    if (!movieInStore) return;

    const newStatus =
      updatedFields.status !== undefined
        ? updatedFields.status
        : movieInStore.status;

    const newIsWatch =
      updatedFields.isWatch !== undefined
        ? updatedFields.isWatch
        : movieInStore.isWatch;

    // Если фильм БОЛЬШЕ НЕ в избранном И НЕ просмотрен — удаляем объект полностью
    if (!newStatus && !newIsWatch) {
      dispatch(deleteFavMovie(movieInStore.id));
    } else {
      // Иначе просто обновляем флаги
      dispatch(
        toggleWatch({
          ...movieInStore,
          ...updatedFields,
        })
      );
    }
  };

  const handlerToggleFav = () => {
    if (movieInStore) {
      // Переключаем статус избранного
      handleUpdateOrDelete({ status: !movieInStore.status });
    } else {
      // Создаем новый объект фильма
      dispatch(
        addFavMovie({
          id: Date.now(),
          poster_path: data.poster_path,
          title: data.title,
          vote_average: data.vote_average,
          status: true,
          favId: movieId,
          isWatch: false,
          release_date: data.release_date,
        })
      );
    }
  };

  const handlerToggleWatched = () => {
    if (movieInStore) {
      // Переключаем статус просмотра
      handleUpdateOrDelete({ isWatch: !movieInStore.isWatch });
    } else {
      // Создаем новый объект фильма со статусом "просмотрено"
      dispatch(
        addFavMovie({
          id: Date.now(),
          poster_path: data.poster_path,
          title: data.title,
          vote_average: data.vote_average,
          status: false,
          favId: movieId,
          isWatch: true,
          release_date: data.release_date,
        })
      );
    }
  };

  return (
    <main className={css.mainMovie}>
      {loading.main && !error && <Loader />}
      {!loading.main && data.id && (
        <div className="fadeIn">
          <div className={css.controls}>
            <BackLink to={backLinkHref.current}>Назад</BackLink>
            <div>
              <Toaster position="top-left" reverseOrder={true} />
            </div>
            <FavButton onAdd={handlerToggleFav}>
              {isFav ? 'Прибрати' : 'Додати'}
              <FaHeart className={clsx(isFav && css.favactive)} />
            </FavButton>
            <WatchButton onAdd={handlerToggleWatched}>
              {isWatch ? <IoEye /> : <IoEyeOutline />}
            </WatchButton>
          </div>

          <div className={css.detailsWrap}>
            {data.poster_path ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={IMG_LINK + data.poster_path}
                  alt={data.original_title}
                  className={clsx(
                    css.moviePoster,
                    isWatch && css.moviePosterWatched
                  )}
                />
                {isWatch && (
                  <span className={css.moviePosterWatchedText}>
                    Переглянуто
                  </span>
                )}
              </div>
            ) : (
              <FaRegFileImage className={css.posterSVG} />
            )}

            <div className={css.movieDescription}>
              <h2>{data.title}</h2>
              <table className={css.infoBox}>
                <tbody>
                  {data.original_title && (
                    <tr>
                      <td>
                        <span className={css.original_title}>
                          Оригінальна назва:
                        </span>
                      </td>
                      <td>{data.original_title}</td>
                    </tr>
                  )}
                  {data.vote_average !== 0 && (
                    <tr>
                      <td>
                        <span>Рейтинг: </span>
                      </td>
                      <td>
                        {data.vote_average && (
                          <span
                            className={buildRateClass(
                              Math.round(data.vote_average * 10)
                            )}
                          >
                            {parseFloat(data.vote_average.toFixed(1))}
                          </span>
                        )}
                      </td>
                    </tr>
                  )}
                  {data.release_date && (
                    <tr>
                      <td>
                        <span>Дата:</span>
                      </td>
                      <td>{data.release_date}</td>
                    </tr>
                  )}
                  {data.runtime !== 0 && (
                    <tr>
                      <td>
                        <span>Тривалість: </span>
                      </td>
                      <td>
                        {data.runtime > 59 &&
                          `${Math.floor(data.runtime / 60)} год.`}
                        {data.runtime % 60 !== 0 && `${data.runtime % 60} хв.`}
                      </td>
                    </tr>
                  )}
                  {data.production_countries?.length > 0 && (
                    <tr>
                      <td>
                        <div className={css.country}>
                          <span>Країна: </span>
                        </div>
                      </td>
                      <td>
                        <ul>
                          {data.production_countries.map((item, index) => (
                            <li key={index}>
                              {item.name}
                              {index + 1 < data.production_countries.length &&
                                ', '}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {data.overview && (
                <>
                  <h4>Опис</h4>
                  <p>{data.overview}</p>
                </>
              )}

              <h4>Жанри</h4>
              <div className={css.genresBox}>
                {data.genres?.map(item => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </div>
            </div>
          </div>

          <div className={css.addInfo}>
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
      )}
    </main>
  );
};

export default MovieDetailsPage;
