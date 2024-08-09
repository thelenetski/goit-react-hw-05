import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import css from './MovieDetailsPage.module.css';
import BackLink from '../../components/BackLink/BackLink';
import dataRequest, { IMG_LINK } from '../../components/Services/Services';
import Loader from '../../components/Loader/Loader';
import { FaRegFileImage } from 'react-icons/fa';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';
  const [data, setData] = useState(null);

  useEffect(() => {
    const requestData = async () => {
      try {
        setLoading(true);
        const data = await dataRequest(URL);
        setData(data);
        setLoading(true);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    requestData();
  }, []);

  return (
    <main className={css.mainMovie}>
      <BackLink to={backLinkHref}>Back</BackLink>
      {loading && <Loader />}
      {!loading && (
        <>
          {data.poster_path ? (
            <img
              src={IMG_LINK + data.poster_path}
              alt={data.original_title}
              className={css.moviePoster}
            />
          ) : (
            <FaRegFileImage className={css.posterSVG} />
          )}

          <div className={css.movieDescription}>
            <h2>{data.original_title}</h2>
            <span>User score: {Math.round(data.vote_average * 10)}%</span>
            <span>Release: {data.release_date}</span>
            <div>
              {data.production_countries.length > 0 && (
                <div>
                  <span>Country: </span>
                  {data.production_countries.map((item, index) => {
                    return <span key={index}>{item.name}</span>;
                  })}
                </div>
              )}
            </div>
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
        </>
      )}
    </main>
  );
};

export default MovieDetailsPage;
