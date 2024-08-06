import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import css from './MovieCast.module.css';

const MovieCast = ({ IMG_LINK }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${id}/credits`;

  const [data, setData] = useState({
    results: [],
  });

  useEffect(() => {
    try {
      setLoading(false);
      const dataRequest = async () => {
        const response = await axios.get(URL, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTU4YmVjZWNmNTM4OTQ3N2RlN2E3MmI1ODRkZDViZiIsIm5iZiI6MTcyMjg3MDkzNy4xODc2MzMsInN1YiI6IjYzODVhZjliMmUwNjk3MDI5MmU0YTYyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.504sSMw6xkLbLg9EtJxY9BlIZvH_Gi1hHxNm_ILzwVY',
            accept: 'application/json',
          },
        });
        return response.data;
      };

      dataRequest()
        .then(data => {
          setData(data);
          setLoading(true);
        })
        .catch(error => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(data.cast);

  return (
    loading && (
      <div className={css.cast}>
        <ul>
          {data.cast.map((item, index) => {
            return (
              index < 10 && (
                <li key={item.id}>
                  <img
                    src={IMG_LINK + item.profile_path}
                    alt={item.original_title}
                    className={css.castPoster}
                  />
                  <p className={css.castTitle}>{item.character}</p>
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
