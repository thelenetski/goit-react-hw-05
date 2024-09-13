import { useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense, useRef } from 'react';
import css from './MovieDetailsPage.module.css';
import BackLink from '../../components/BackLink/BackLink';
import {
  IMG_LINK,
  IMG_LINK_ORIGINAL,
} from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import { FaRegFileImage } from 'react-icons/fa';
import clsx from 'clsx';
import FavButton from '../../components/FavButton/FavButton';
import WatchButton from '../../components/WatchButton/WatchButton';
import { FaHeart } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';
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
  toggleWatch,
} from '../../redux/moviesOps';
import { Toaster } from 'react-hot-toast';
import { changeBG, changeItems, changePagesNav } from '../../redux/moviesSlice';

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
  const [isWatch, setIsWatch] = useState(false);

  useEffect(() => {
    dispatch(changePagesNav(false));
    dispatch(changeItems('outlet'));
    if (!favData || favData.length === 0) {
      dispatch(fetchFavMovies());
    }
    favData.some(item => item.favId === movieId && item.status === true) &&
      setIsFav(true);
    favData.forEach(item => item.favId === movieId && setIsWatch(item.isWatch));
  }, [favData]);

  useEffect(() => {
    dispatch(changeItems('items'));
    dispatch(fetchMovies(URL)).then(() => {
      window.scrollTo(0, 0);
    });
  }, [dispatch, URL]);

  useEffect(() => {
    data.backdrop_path !== undefined &&
      dispatch(changeBG(IMG_LINK_ORIGINAL + data.backdrop_path));
  }, [dispatch, data.backdrop_path]);

  const handlerAddFav = () => {
    favData.forEach(item => {
      if (item.favId === movieId) {
        dispatch(toggleWatch({ ...item, status: !item.status }));
        deleteMovie({ ...item, status: !item.status });
        setIsFav(false);
        return;
      }
      setIsFav(false);
      return;
    });
    if (!favData.some(item => item.favId === movieId)) addFav();
  };

  const addFav = () => {
    console.log('addFav', isWatch);
    dispatch(
      addFavMovie({
        poster_path: data.poster_path,
        title: data.title,
        vote_average: data.vote_average,
        status: true,
        favId: movieId,
        isWatch: isWatch,
      })
    );
    setIsFav(true);
  };

  const handlerAddWatched = () => {
    console.log(favData);
    favData.forEach(item => {
      if (item.favId === movieId) {
        console.log('change watched movie');
        dispatch(toggleWatch({ ...item, isWatch: !item.isWatch }));
        deleteMovie({ ...item, isWatch: !item.isWatch });
        setIsWatch(!item.isWatch);
        return;
      }
      return;
    });
    if (!favData.some(item => item.favId === movieId)) {
      console.log('add new watched movie');
      setIsWatch(true);
      addWatched();
    }
  };

  const addWatched = () => {
    console.log('addwatched', isWatch);
    dispatch(
      addFavMovie({
        poster_path: data.poster_path,
        title: data.title,
        vote_average: data.vote_average,
        status: false,
        favId: movieId,
        isWatch: true,
      })
    );
    setIsWatch(true);
  };

  const deleteMovie = item => {
    console.log('delete fav movie');
    item.status === false &&
      item.isWatch === false &&
      dispatch(deleteFavMovie(item.id));
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
            <WatchButton onAdd={handlerAddWatched}>
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
                <tr>
                  <td>
                    <span className={css.original_title}>
                      Оригінальна назва:
                    </span>
                  </td>
                  <td>{data.original_title}</td>
                </tr>
                <tr>
                  <td>
                    <span>Рейтинг: </span>
                  </td>
                  <td>
                    <span
                      className={buildRateClass(
                        Math.round(data.vote_average * 10)
                      )}
                    >
                      {parseFloat(data.vote_average.toFixed(1))}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Дата:</span>
                  </td>
                  <td>{data.release_date}</td>
                </tr>
                <tr>
                  <td>
                    <span>Тривалість: </span>
                  </td>
                  <td>
                    {`${Math.floor(data.runtime / 60)} год. ${
                      data.runtime % 60
                    } хв.`}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={css.country}>{<span>Країна: </span>}</div>
                  </td>
                  <td>
                    {data.production_countries.length > 0 && (
                      <ul>
                        {data.production_countries.map((item, index) => {
                          return (
                            <li key={index}>
                              {item.name}
                              {index + 1 < data.production_countries.length &&
                                `, `}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </td>
                </tr>
              </table>
              {/* <span className={css.original_title}>
                Оригінальна назва: {data.original_title}
              </span>
              <span>
                Рейтинг:{' '}
                <span
                  className={buildRateClass(Math.round(data.vote_average * 10))}
                >
                  {parseFloat(data.vote_average.toFixed(1))}
                </span>
              </span>
              <span>Дата: {data.release_date}</span>
              <span>
                Тривалість:{' '}
                {`${Math.floor(data.runtime / 60)} год. ${
                  data.runtime % 60
                } хв.`}
              </span>
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
              </div> */}
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
          </div>
          <div className={css.addInfo}>
            {/* <h4>Додаткова інформація</h4> */}
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
        </>
      )}
    </main>
  );
};

export default MovieDetailsPage;
