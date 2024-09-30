import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
import { BiSolidUserRectangle } from 'react-icons/bi';
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

const MovieReviews = () => {
  const { movieId } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
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

  // console.log(data);

  return (
    <>
      {loading.outlet && !error && <Loader />}
      {!loading.outlet && data.results && (
        <div className={css.reviews}>
          <ul className={clsx(data.results.length == 0 && css.reviewsBox)}>
            {data.results.length == 0 && <p>Поки немає жодних відгуків</p>}
            {data.results.map((item, index) => {
              return (
                index < 8 && (
                  <li key={index}>
                    <div className={css.reviewsAuthorBox}>
                      {item['author_details'].avatar_path &&
                      item['author_details'].avatar_path ? (
                        <img
                          src={IMG_LINK + item['author_details'].avatar_path}
                          alt={item.original_title}
                          className={css.authorAvatar}
                        />
                      ) : (
                        <BiSolidUserRectangle />
                      )}
                      <h6>{item.author}</h6>
                    </div>
                    <p>{item.content}</p>
                    <span>{item.created_at.slice(0, 10)}</span>
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

export default MovieReviews;
