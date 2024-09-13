import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
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

const MovieReviews = () => {
  const { movieId } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  const dispatch = useDispatch();
  const data = useSelector(selectOutlet);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchOutlet(URL));
  }, [dispatch, URL]);

  // console.log(data);

  return (
    <>
      {loading.outlet && !error && <Loader />}
      {!loading.outlet && data.results && (
        <div className={css.reviews}>
          {data['results'].length == 0 && <p>Поки немає жодних відгуків</p>}
          <ul>
            {data.results.map((item, index) => {
              return (
                index < 6 && (
                  <li key={item.id}>
                    <div className={css.reviewsAuthorBox}>
                      {item['author_details'].avatar_path &&
                      item['author_details'].avatar_path ? (
                        <img
                          src={IMG_LINK + item['author_details'].avatar_path}
                          alt={item.original_title}
                          className={css.authorAvatar}
                        />
                      ) : (
                        <FaRegUserCircle />
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
