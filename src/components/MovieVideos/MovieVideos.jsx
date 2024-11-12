import { useEffect, useState } from 'react';
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
  const URL_RU = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ru-RU`;
  const URL_EN = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

  const dispatch = useDispatch();
  const data = useSelector(selectOutlet);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [videosStatus, setVideosStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchOutlet(URL))
      .unwrap()
      .then(videos => {
        window.scrollTo({
          top: window.scrollY + 400,
          behavior: 'smooth',
        });

        videos.results.length === 0 &&
          dispatch(fetchOutlet(URL_RU))
            .unwrap()
            .then(videosRU => {
              videosRU.results.length === 0 &&
                dispatch(fetchOutlet(URL_EN))
                  .unwrap()
                  .then(videosEN => {
                    videosEN.results.length === 0 && setVideosStatus(true);
                  });
            });
      });
  }, [dispatch, URL, URL_EN]);

  return (
    <>
      {loading.outlet && !error && <Loader />}
      {data.results && (
        <div className={css.videosBox}>
          <ul>
            {videosStatus && <p>Немає жодних відео</p>}
            {data.results.map((item, index) => {
              return (
                index < 6 && (
                  <li key={item.id}>
                    {
                      <iframe
                        width="560"
                        // height="315"
                        src={`https://www.youtube.com/embed/${item.key}`}
                        title="Trailer"
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
