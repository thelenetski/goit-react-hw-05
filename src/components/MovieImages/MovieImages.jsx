import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieImages.module.css';
import dataRequest, { IMG_LINK } from '../Services/Services';

const MovieImages = () => {
  const { movieId } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/images`;

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
      <div className={css.imgBox}>
        <ul>
          {data.backdrops.map((item, index) => {
            return (
              index < 8 && (
                <li key={index}>
                  {
                    <img
                      src={IMG_LINK + item.file_path}
                      className={css.image}
                    />
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

export default MovieImages;
