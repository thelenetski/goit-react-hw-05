import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieVideos.module.css';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectOutlet,
} from '../../redux/selectors';
import { fetchOutlet } from '../../redux/moviesOps';

const MovieVideos = () => {
  const { movieId } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=uk-UA`;

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
      {data.results && (
        <div className={css.videosBox}>
          {data.results.length === 0 && <p>Немає жодних відео</p>}
          <ul>
            {data.results.map((item, index) => {
              return (
                index < 6 && (
                  <li key={item.id}>
                    {
                      <iframe
                        width="560"
                        // height="315"
                        src={`https://www.youtube.com/embed/${item.key}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className={css.video}
                      ></iframe>
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

export default MovieVideos;
