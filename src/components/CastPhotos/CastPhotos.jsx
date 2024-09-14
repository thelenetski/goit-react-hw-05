import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './CastPhotos.module.css';
import { IMG_LINK } from '../Services/Services';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectOutlet,
} from '../../redux/selectors';
import { fetchOutlet } from '../../redux/moviesOps';
import Image from '../Image/Image';
import clsx from 'clsx';

const CastPhotos = () => {
  const { castId } = useParams();
  const URL = `https://api.themoviedb.org/3/person/${castId}/images`;

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
      {!loading.outlet && data.profiles && (
        <div className={css.imgBox}>
          {data.profiles.length === 0 && <p>Немає фотографій</p>}
          <ul>
            {data.profiles.map((item, index) => {
              return (
                index < 8 && (
                  <li
                    key={index}
                    className={clsx(
                      data.profiles.length &&
                        data.profiles.length < 4 &&
                        css.img_alone
                    )}
                  >
                    <Image
                      className={css.image}
                      src={IMG_LINK + item.file_path}
                      alt={item.title}
                    />
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

export default CastPhotos;
