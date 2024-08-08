import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { FaRegUserCircle } from 'react-icons/fa';

const MovieCast = ({ setUrl, IMG_LINK }) => {
  const { id } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${id}/credits`;

  const [data, setData] = useState({
    results: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUrl(URL)
      .then(data => {
        setData(data);
        setLoading(true);
      })
      .catch(error => {
        console.log(error.message);
      });
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
