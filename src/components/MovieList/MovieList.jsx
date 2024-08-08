import { Link } from 'react-router-dom';
import css from './MovieList.module.css';
import { FaRegFileImage } from 'react-icons/fa';

const MovieList = ({ to, data, IMG_LINK, state }) => {
  return (
    <>
      <ul className={css.moviesList}>
        {data.results.map(item => {
          return (
            <li key={item.id} className={css.moviesItem}>
              <Link to={(to ?? '') + item.id.toString()} state={state}>
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
