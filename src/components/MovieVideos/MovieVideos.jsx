import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieVideos.module.css';
import dataRequest from '../Services/Services';

const MovieVideos = () => {
  const { movieId } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

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
      <div className={css.videosBox}>
        <ul>
          {data.results.map((item, index) => {
            return (
              index < 6 && (
                <li key={item.id}>
                  {
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${item.key}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                      className={css.video}
                    ></iframe>
                  }
                </li>
              )
            );
          })}
        </ul>
      </div>
    )
  );
};

export default MovieVideos;
