import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './CastMovies.module.css';
import { IMG_LINK } from '../Services/Services';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectOutlet,
} from '../../redux/selectors';
import { fetchOutlet } from '../../redux/moviesOps';
import clsx from 'clsx';
import Image from '../Image/Image';

const CastMovies = () => {
  const { castId } = useParams();
  const URL = `https://api.themoviedb.org/3/person/${castId}/movie_credits?language=uk-UA`;

  const dispatch = useDispatch();
  const data = useSelector(selectOutlet);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchOutlet(URL)).then(() => {
      window.scrollTo({
        top: window.scrollY + 300,
        behavior: 'smooth',
      });
    });
  }, [dispatch, URL]);

  return (
    <>
      {loading.outlet && !error && <Loader />}
      {!loading.outlet && data.cast && (
        <div className={css.imgBox}>
          {data.cast.length === 0 && <p>Немає фільмів</p>}
          <ul>
            {data.cast.map((item, index) => {
              return (
                index < 16 && (
                  <li
                    key={index}
                    className={clsx(
                      data.cast.length && data.cast.length < 4 && css.img_alone
                    )}
                  >
                    {/* <img
                      src={IMG_LINK + item.poster_path}
                      className={css.image}
                      loading="lazy"
                    /> */}
                    <Image
                      className={css.image}
                      src={IMG_LINK + item.poster_path}
                      alt={item.title}
                    />
                    <p className={css.title}>{item.title}</p>
                    {item.release_date && (
                      <span className={css.movieTitleYear}>
                        {item.release_date.substring(0, 4)}
                      </span>
                    )}
                  </li>
                )
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default CastMovies;
