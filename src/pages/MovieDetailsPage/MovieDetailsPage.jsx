import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import css from './MovieDetailsPage.module.css';
import BackLink from '../../copmponents/BackLink/BackLink';

const MovieDetailsPage = ({ setUrl, data, IMG_LINK }) => {
  const { id } = useParams();
  const URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';

  useEffect(() => {
    setUrl(URL);
  }, []);

  return (
    data.poster_path && (
      <main className={css.mainMovie}>
        <BackLink to={backLinkHref}>Back</BackLink>
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
        <div className={css.addInfo}>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>

          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    )
  );
};

export default MovieDetailsPage;
