import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { IMG_LINK } from '../Services/Services';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectOutlet,
} from '../../redux/selectors';
import { fetchOutlet } from '../../redux/moviesOps';

const MovieCast = () => {
  const { movieId } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const dispatch = useDispatch();
  const data = useSelector(selectOutlet);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchOutlet(URL));
  }, [dispatch, URL]);

  return (
    <>
      {loading.outlet && !error && <Loader />}
      {data.cast && (
        <div className={css.cast}>
          {data.cast.length === 0 && <p>Немає списку акторів</p>}
          <ul>
            {data.cast.map((item, index) => {
              return (
                index < 9 && (
                  <li key={item.id}>
                    {item.profile_path ? (
                      <img
                        src={IMG_LINK + item.profile_path}
                        alt={item.original_title}
                        className={css.castPoster}
                      />
                    ) : (
                      <FaRegUserCircle />
                    )}

                    <p className={css.castTitle}>{item.name}</p>
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

export default MovieCast;
