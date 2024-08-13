import { Link } from 'react-router-dom';
import css from './MovieList.module.css';
import { FaRegFileImage } from 'react-icons/fa';
import { IMG_LINK } from '../Services/Services';

const MovieList = ({ data, state }) => {
  return (
    <>
      <ul className={css.moviesList}>
        {data.map(item => {
          return (
            <li key={item.id} className={css.moviesItem}>
              <Link to={item.id.toString()} state={state}>
                {item.poster_path ? (
                  <img
                    src={IMG_LINK + item.poster_path}
                    alt={item.original_title}
                    className={css.moviePoster}
                  />
                ) : (
                  <FaRegFileImage />
                )}
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
