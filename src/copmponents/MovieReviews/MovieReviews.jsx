import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import css from './MovieReviews.module.css';
import { FaRegUserCircle } from 'react-icons/fa';

const MovieCast = ({ IMG_LINK }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${id}/reviews`;

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

  return (
    loading && (
      <div className={css.reviews}>
        <ul>
          {data.results.map((item, index) => {
            return (
              index < 6 && (
                <li key={item.id}>
                  <div className={css.reviewsAuthorBox}>
                    {item['author_details'].avatar_path ? (
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
    )
  );
};

export default MovieCast;
