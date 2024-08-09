import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import dataRequest, { IMG_LINK } from '../Services/Services';

const MovieReviews = () => {
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;

  const [data, setData] = useState(null);

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
      <div className={css.reviews}>
        {data['results'].length == 0 && (
          <p>We don&apos;t have any reviews for this movie</p>
        )}
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

export default MovieReviews;
