import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import dataRequest, { IMG_LINK } from '../Services/Services';

const MovieCast = () => {
  const { movieId } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestData = async () => {
      try {
        const data = await dataRequest(URL);
        setData(data);
        setLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };

    requestData();
  }, []);

  return (
    loading && (
      <div className={css.cast}>
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
    )
  );
};

export default MovieCast;
