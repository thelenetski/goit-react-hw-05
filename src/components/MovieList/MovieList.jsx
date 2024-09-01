import { Link } from 'react-router-dom';
import css from './MovieList.module.css';
import { FaRegFileImage } from 'react-icons/fa';
import { IMG_LINK } from '../Services/Services';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { changePagesNav } from '../../redux/moviesSlice';
import clsx from 'clsx';

const MovieList = ({ link, results, state }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    results !== undefined &&
      results.length > 0 &&
      state.pathname !== '/home' &&
      state.pathname !== '/favorites' &&
      dispatch(changePagesNav(true));
  });

  return (
    <>
      <ul className={css.moviesList}>
        {results !== undefined &&
          [...results]
            .sort((a, b) => {
              if (a.isWatch === b.isWatch) return 0;
              if (a.isWatch === undefined) return 1;
              if (b.isWatch === undefined) return -1;
              return a.isWatch ? 1 : -1;
            })
            .map(item => {
              return (
                <li key={item.id} className={css.moviesItem}>
                  <Link
                    to={
                      link
                        ? `${link}/${item.id.toString()}`
                        : item.id.toString()
                    }
                    state={state}
                  >
                    {item.poster_path ? (
                      <img
                        src={IMG_LINK + item.poster_path}
                        alt={item.original_title}
                        className={clsx(
                          css.moviePoster,
                          item.isWatch && css.moviePosterWatched
                        )}
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
