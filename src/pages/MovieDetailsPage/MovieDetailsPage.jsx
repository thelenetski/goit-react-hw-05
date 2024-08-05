import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from './MovieDetailsPage.module.css';
import axios from 'axios';

const MovieDetailsPage = ({ IMG_LINK }) => {
  const { id } = useParams();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(false);
      const dataRequest = async () => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTU4YmVjZWNmNTM4OTQ3N2RlN2E3MmI1ODRkZDViZiIsIm5iZiI6MTcyMjg3MDkzNy4xODc2MzMsInN1YiI6IjYzODVhZjliMmUwNjk3MDI5MmU0YTYyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.504sSMw6xkLbLg9EtJxY9BlIZvH_Gi1hHxNm_ILzwVY',
              accept: 'application/json',
            },
          }
        );
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
  }, [id]);

  return (
    loading && (
      <main className={css.mainMovie}>
        <img
          src={IMG_LINK + data.poster_path}
          alt={data.original_title}
          className={css.moviePoster}
        />
        <div className={css.movieDescription}>
          <h2>{data.original_title}</h2>
          <p>User score: {Math.round(data.vote_average * 10)}%</p>
          <h4>Overview</h4>
          <p>{data.overview}</p>
          <h4>Genres</h4>
          <div className={css.genresBox}>
            {data.genres.map(item => {
              return <p key={item.id}>{item.name}</p>;
            })}
          </div>
        </div>
      </main>
    )
  );
};

export default MovieDetailsPage;
