import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieImages.module.css';
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

const MovieImages = () => {
  const { movieId } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/images`;

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
      {!loading.outlet && data.backdrops && (
        <div className={css.imgBox}>
          {data.backdrops.length === 0 && <p>Немає жодних кадрів</p>}
          <ul>
            {data.backdrops.map((item, index) => {
              return (
                index < 8 && (
                  <li
                    key={index}
                    className={clsx(
                      data.backdrops.length &&
                        data.backdrops.length < 4 &&
                        css.img_alone
                    )}
                  >
                    {
                      <img
                        src={IMG_LINK + item.file_path}
                        className={css.image}
                      />
                    }
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

export default MovieImages;
