import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ to, data, IMG_LINK }) => {
  const location = useLocation();
  return (
    <>
      <ul className={css.moviesList}>
        {data.results.map(item => {
          return (
            <li key={item.id} className={css.moviesItem}>
              <Link to={(to ?? '') + item.id.toString()} state={location}>
                <img
                  src={IMG_LINK + item.poster_path}
                  alt={item.original_title}
                  className={css.moviePoster}
                />
                <p className={css.movieTitle}>{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
