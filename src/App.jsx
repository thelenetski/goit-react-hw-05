import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './copmponents/Navigation/Navigation';
import NotFound from './pages/NotFoundPage/NotFoundPage';

const Home = lazy(() => import('./pages/HomePage/HomePage'));
const Movies = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MoviesDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./copmponents/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./copmponents/MovieReviews/MovieReviews')
);

function App() {
  const IMG_LINK = 'https://image.tmdb.org/t/p/w500';

  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home IMG_LINK={IMG_LINK} />} />
          <Route path="/movies" element={<Movies IMG_LINK={IMG_LINK} />} />
          <Route
            path="/movies/:id"
            element={<MoviesDetailsPage IMG_LINK={IMG_LINK} />}
          >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
