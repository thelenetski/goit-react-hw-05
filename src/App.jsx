import './App.css';
import { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation/Navigation';

const Home = lazy(() => import('./pages/HomePage/HomePage'));
const Movies = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MoviesDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  const IMG_LINK = 'https://image.tmdb.org/t/p/w500';
  const TREND_URL =
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

  const [data, setData] = useState({
    results: [],
  });

  useEffect(() => {
    try {
      dataRequest(TREND_URL)
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

  const dataRequest = async url => {
    const response = await axios.get(url, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTU4YmVjZWNmNTM4OTQ3N2RlN2E3MmI1ODRkZDViZiIsIm5iZiI6MTcyMjg3MDkzNy4xODc2MzMsInN1YiI6IjYzODVhZjliMmUwNjk3MDI5MmU0YTYyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.504sSMw6xkLbLg9EtJxY9BlIZvH_Gi1hHxNm_ILzwVY',
        accept: 'application/json',
      },
    });
    return response.data;
  };

  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setUrl={dataRequest}
                url={TREND_URL}
                data={data}
                IMG_LINK={IMG_LINK}
              />
            }
          />
          <Route
            path="/movies"
            element={<Movies setUrl={dataRequest} IMG_LINK={IMG_LINK} />}
          />
          <Route
            path="/movies/:id"
            element={
              <MoviesDetailsPage setUrl={dataRequest} IMG_LINK={IMG_LINK} />
            }
          >
            <Route
              path="cast"
              element={<MovieCast setUrl={dataRequest} IMG_LINK={IMG_LINK} />}
            />
            <Route
              path="reviews"
              element={
                <MovieReviews setUrl={dataRequest} IMG_LINK={IMG_LINK} />
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
