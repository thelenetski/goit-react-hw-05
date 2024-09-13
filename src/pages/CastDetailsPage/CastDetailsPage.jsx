import { useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense, useRef } from 'react';
import css from './CastDetailsPage.module.css';
import BackLink from '../../components/BackLink/BackLink';
import { IMG_LINK } from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import { FaRegFileImage } from 'react-icons/fa';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectMovies,
  // selectFavMovies,
} from '../../redux/selectors';
import { fetchMovies } from '../../redux/moviesOps';
import { Toaster } from 'react-hot-toast';
import { changeItems, changePagesNav } from '../../redux/moviesSlice';
import LoaderPoster from '../../components/Loader/LoaderPoster';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const buildRateClass = rate => {
  return clsx(
    rate < 59 && 'rateBad',
    (rate < 70 && 'rateNorm') || (rate > 69 && 'rateNice')
  );
};

const CastDetailsPage = () => {
  const { castId } = useParams();
  const data = useSelector(selectMovies);
  // const favData = useSelector(selectFavMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const location = useLocation();
  const URL = `https://api.themoviedb.org/3/person/${castId}?language=uk-UA`;
  const backLinkHref = useRef(location.state ?? '/home');
  const [loadingImg, setLoadingImg] = useState(true);

  const handleImageLoaded = () => {
    setLoadingImg(false);
  };

  useEffect(() => {
    dispatch(changePagesNav(false));
    dispatch(changeItems('items'));
    dispatch(fetchMovies(URL)).then(() => {
      window.scrollTo(0, 0);
    });
  }, [dispatch, URL]);

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
          </div>
          <div className={css.detailsWrap}>
            {data && data.profile_path ? (
              <div style={{ position: 'relative' }}>
                {loadingImg && <LoaderPoster />}
                <img
                  src={IMG_LINK + data.profile_path}
                  alt={data.name}
                  className={clsx(css.moviePoster)}
                  onLoad={handleImageLoaded}
                />
              </div>
            ) : (
              <FaRegFileImage className={css.posterSVG} />
            )}
            <div className={css.movieDescription}>
              <h2>
                {data &&
                  `${data.name} (${
                    data.birthday && 2024 - data.birthday.substring(0, 4)
                  }р.)`}
              </h2>
              <table className={css.infoBox}>
                <tbody>
                  <tr>
                    <td>
                      <span className={css.original_title}>
                        Дата народження:
                      </span>
                    </td>
                    <td>{data && data.birthday}</td>
                  </tr>
                  <tr>
                    <td>
                      <span>Рейтинг: </span>
                    </td>
                    <td>
                      {data && (
                        <span
                          className={buildRateClass(
                            Math.round(data.popularity * 10)
                          )}
                        >
                          {parseFloat(data.popularity.toFixed(1))}
                        </span>
                      )}
                    </td>
                  </tr>
                  {/* <tr>
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
                  </tr> */}
                </tbody>
              </table>
              {data && (
                <>
                  {data.biography && (
                    <>
                      <h4>Біографія</h4>
                      <p>{data.biography}</p>
                    </>
                  )}
                </>
              )}
              {/* <h4>Жанри</h4>
              <div className={css.genresBox}>
                {data.genres.map(item => {
                  return <p key={item.id}>{item.name}</p>;
                })}
              </div>  */}
            </div>
          </div>
          <div className={css.addInfo}>
            {/* <h4>Додаткова інформація</h4> */}
            <ul>
              <li>
                <NavLink to="castmovies" className={buildLinkClass}>
                  Фільми
                </NavLink>
              </li>
              <li>
                <NavLink to="castphotos" className={buildLinkClass}>
                  Фото
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

export default CastDetailsPage;
