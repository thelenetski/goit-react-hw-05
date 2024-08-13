import { useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense, useRef } from 'react';
import css from './MovieDetailsPage.module.css';
import BackLink from '../../components/BackLink/BackLink';
import dataRequest, { IMG_LINK } from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import { FaRegFileImage } from 'react-icons/fa';
import clsx from 'clsx';
import FavButton from '../../components/FavButton/FavButton';
import { FaHeart } from 'react-icons/fa';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const URL = `https://api.themoviedb.org/3/movie/${movieId}?language=uk-UA`;
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/');
  const [data, setData] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('favorite')) {
      const favArray = JSON.parse(localStorage.getItem('favorite'));
      Array.isArray(favArray) &&
        favArray.some(item => item.movieId === movieId) &&
        setIsFav(true);
    }

    const requestData = async () => {
      try {
        setLoading(true);
        const data = await dataRequest(URL);
        setData(data);
        setLoading(true);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    requestData();
  }, []);

  const handlerAddFav = () => {
    if (localStorage.getItem('favorite') !== null) {
      const favArray = JSON.parse(localStorage.getItem('favorite'));
      if (favArray.some(item => item.movieId === movieId)) {
        const newFav = favArray.filter(
          item => parseInt(item.movieId) !== parseInt(movieId)
        );
        localStorage.setItem('favorite', JSON.stringify(newFav));
        setIsFav(false);
        return;
      }

      favArray.push({
        movieId,
        poster_path: [data.poster_path],
        title: [data.title],
      });

      localStorage.setItem('favorite', JSON.stringify(favArray));
      setIsFav(true);
      return;
    }

    localStorage.setItem(
      'favorite',
      JSON.stringify([
        {
          movieId,
          poster_path: [data.poster_path],
          title: [data.title],
        },
      ])
    );
    setIsFav(true);
  };

  return (
    <main className={css.mainMovie}>
      <div className={css.controls}>
        <BackLink to={backLinkHref.current}>Назад</BackLink>
        <FavButton onAdd={handlerAddFav} />
        <FaHeart className={clsx(isFav && css.favactive)} />
      </div>
      {loading && <Loader />}
      <div className={css.detailsWrap}>
        {!loading && (
          <>
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
              <span>Рейтинг: {Math.round(data.vote_average * 10)}%</span>
              <span>Дата: {data.release_date}</span>
              <div>
                {data.production_countries.length > 0 && (
                  <div>
                    <span>Країна: </span>
                    {data.production_countries.map((item, index) => {
                      return <span key={index}>{item.name}</span>;
                    })}
                  </div>
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

              <Suspense fallback={<div>Loading subpage...</div>}>
                <Outlet />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MovieDetailsPage;
