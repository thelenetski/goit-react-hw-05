import { useEffect, useState } from 'react';
import MovieList from '../../copmponents/MovieList/MovieList';
import axios from 'axios';
import css from './HomePage.module.css';

const Home = ({ IMG_LINK }) => {
  const [data, setData] = useState({
    results: [],
  });

  useEffect(() => {
    try {
      const dataRequest = async () => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
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
        })
        .catch(error => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <main className={css.main}>
      <h1>Tranding today</h1>
      {data && <MovieList data={data} IMG_LINK={IMG_LINK} />}
    </main>
  );
};

export default Home;
