import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { FaRegFileImage } from 'react-icons/fa';
import { IMG_LINK } from '../Services/Services';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { changePagesNav } from '../../redux/moviesSlice';
import clsx from 'clsx';

const MovieList = ({ link, results, state }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    results !== undefined &&
      results.length > 0 &&
      state.pathname !== '/home' &&
      state.pathname !== '/favorites' &&
      dispatch(changePagesNav(true));
  });

  useEffect(() => {
    if (results !== undefined) {
      const savedScrollPosition = sessionStorage.getItem(location.pathname);
      savedScrollPosition &&
        window.scrollTo({
          top: parseInt(savedScrollPosition),
          behavior: 'smooth',
        });
    }

    const handleScroll = () => {
      window.scrollY > 1 &&
        sessionStorage.setItem(location.pathname, Math.round(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [results, location.pathname]);

  return (
    <>
      <ul className={css.moviesList}>
        {results !== undefined &&
          [...results]
            .filter(item => {
              if (state.pathname == '/favorites') {
                if (item.status !== undefined && item.status === true)
                  return item;
                if (item.status === undefined) return item;
              } else {
                return item;
              }
            })
            .sort((a, b) => {
              if (state.pathname == '/favorites') {
                if (a.isWatch === b.isWatch) return 0;
                if (a.isWatch === undefined) return 1;
                if (b.isWatch === undefined) return -1;

                return a.isWatch ? 1 : -1;
              }
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
