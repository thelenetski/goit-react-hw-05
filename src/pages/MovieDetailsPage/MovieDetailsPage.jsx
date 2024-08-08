import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import css from './MovieDetailsPage.module.css';
import BackLink from '../../components/BackLink/BackLink';

const MovieDetailsPage = ({ setUrl, IMG_LINK }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';
  const [data, setData] = useState({
    results: [],
  });

  useEffect(() => {
    setUrl(URL)
      .then(data => {
        setData(data);
        setLoading(true);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    loading && (
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
          {data.overview && (
            <>
              <h4>Overview</h4>
              <p>{data.overview}</p>
            </>
          )}
          <h4>Genres</h4>
          <div className={css.genresBox}>
            {data.genres.map(item => {
              return <p key={item.id}>{item.name}</p>;
            })}
          </div>
        </div>
        <div className={css.addInfo}>
          <h4>Additional information</h4>
          <ul>
            <li>
              <Link to="cast" state={backLinkHref}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={backLinkHref}>
                Reviews
              </Link>
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
