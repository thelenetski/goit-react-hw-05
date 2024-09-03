import './App.css';
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectBG } from './redux/selectors';

const Home = lazy(() => import('./pages/HomePage/HomePage'));
const Movies = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieCat = lazy(() => import('./components/MovieCat/MovieCat'));
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

const basePaths = ['home', 'favorites'];

function renderMovieSubRoutes() {
  return (
    <>
      <Route path="cast" element={<MovieCast />} />
      <Route path="reviews" element={<MovieReviews />} />
      <Route path="images" element={<MovieImages />} />
      <Route path="videos" element={<MovieVideos />} />
    </>
  );
}

function App() {
  const BG = useSelector(selectBG);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxElement = document.querySelector('.backgroundWrap');
      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${
          (scrollY / 2) * 0.1
        }px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Удаляем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="parallaxBG">
        <div
          style={{ backgroundImage: `url(${BG})` }}
          className="backgroundWrap"
        ></div>
        <div className="backgroundBlur"></div>
        <div className="navHiddenBox"></div>

        <Navigation />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<FavMovies />} />
            <Route path="/movies" element={<Movies />}>
              <Route path=":catName" element={<MovieCat />} />
            </Route>
            <Route
              path="/movies/:catName/:movieId"
              element={<MoviesDetailsPage />}
            >
              {renderMovieSubRoutes()}
            </Route>
            <Route
              path="/movies/search-article/:movieId"
              element={<MoviesDetailsPage />}
            >
              {renderMovieSubRoutes()}
            </Route>
            {basePaths.map((basePath, index) => (
              <Route
                path={`${basePath}/:movieId`}
                element={<MoviesDetailsPage />}
                key={index}
              >
                {renderMovieSubRoutes()}
              </Route>
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
