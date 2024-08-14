import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';

const Home = lazy(() => import('./pages/HomePage/HomePage'));
const Movies = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const NowPlaying = lazy(() =>
  import('./pages/MoviesPage/Cats/NowPlaying/NowPlaying')
);
const Populars = lazy(() =>
  import('./pages/MoviesPage/Cats/Populars/Populars')
);
const TopRating = lazy(() =>
  import('./pages/MoviesPage/Cats/TopRating/TopRating')
);
const Upcoming = lazy(() =>
  import('./pages/MoviesPage/Cats/Upcoming/Upcoming')
);
const MoviesDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);
const MovieImages = lazy(() => import('./components/MovieImages/MovieImages'));
const MovieVideos = lazy(() => import('./components/MovieVideos/MovieVideos'));
const FavMovies = lazy(() => import('./pages/FavPage/FavPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />}>
            <Route path="nowplaying" element={<NowPlaying />} />
            <Route path="populars" element={<Populars />} />
            <Route path="toprating" element={<TopRating />} />
            <Route path="upcoming" element={<Upcoming />} />
          </Route>
          <Route path="/favorites" element={<FavMovies />} />
          <Route path="home/:movieId" element={<MoviesDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="images" element={<MovieImages />} />
            <Route path="videos" element={<MovieVideos />} />
          </Route>
          <Route path="movies/:movieId" element={<MoviesDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="images" element={<MovieImages />} />
            <Route path="videos" element={<MovieVideos />} />
          </Route>
          <Route path="favorites/:movieId" element={<MoviesDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="images" element={<MovieImages />} />
            <Route path="videos" element={<MovieVideos />} />
          </Route>
          <Route
            path="movies/nowplaying/:movieId"
            element={<MoviesDetailsPage />}
          >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="images" element={<MovieImages />} />
            <Route path="videos" element={<MovieVideos />} />
          </Route>
          <Route
            path="movies/populars/:movieId"
            element={<MoviesDetailsPage />}
          >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="images" element={<MovieImages />} />
            <Route path="videos" element={<MovieVideos />} />
          </Route>
          <Route
            path="movies/toprating/:movieId"
            element={<MoviesDetailsPage />}
          >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="images" element={<MovieImages />} />
            <Route path="videos" element={<MovieVideos />} />
          </Route>
          <Route
            path="movies/upcoming/:movieId"
            element={<MoviesDetailsPage />}
          >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="images" element={<MovieImages />} />
            <Route path="videos" element={<MovieVideos />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
