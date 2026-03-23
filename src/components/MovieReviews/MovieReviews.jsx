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
  const sortedReviews =
    data.results &&
    [...data.results].sort(
      (a, b) => +new Date(b.updated_at) - +new Date(a.updated_at)
    );

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
      {!loading.outlet && sortedReviews && (
        <div className={css.reviews}>
          <ul className={clsx(sortedReviews.length == 0 && css.reviewsBox)}>
            {sortedReviews.length == 0 && <p>Поки немає жодних відгуків</p>}
            {sortedReviews.map((item, index) => {
              return (
                index < 8 && (
                  <li key={index} className="fadeIn">
                    <div className={css.reviewsAuthorBox}>
                      {item['author_details']?.avatar_path !== undefined &&
                      item['author_details']?.avatar_path ? (
                        <img
                          src={IMG_LINK + item['author_details']?.avatar_path}
                          alt={item.original_title}
                          className={css.authorAvatar}
                        />
                      ) : (
                        <BiSolidUserRectangle />
                      )}
                      <h6>{item.author}</h6>
                    </div>
                    <p>{item.content}</p>
                    <span>{item.updated_at?.slice(0, 10)}</span>
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
