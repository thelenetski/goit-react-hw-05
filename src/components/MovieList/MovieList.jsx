import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { FaRegFileImage } from 'react-icons/fa';
import { IMG_LINK } from '../Services/Services';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { changePagesNav } from '../../redux/moviesSlice';
import Poster from './Poster/Poster';
import clsx from 'clsx';

const MovieList = ({ link, results, state }) => {
  const location = useLocation();
  const pagePath = location.pathname + location.search;
  const [waitScroll, setWaitScroll] = useState(false);
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
      const savedData = sessionStorage.getItem(pagePath);
      let isRestored = false; // Флаг: удалось ли восстановить скролл

      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);

          if (parsedData && typeof parsedData === 'object') {
            const { position, timestamp } = parsedData;
            const ONE_HOUR = 60 * 60 * 1000; // 1 час в мс

            if (timestamp && Date.now() - timestamp < ONE_HOUR) {
              position < 1300
                ? window.scrollTo({
                    top: position,
                    behavior: 'smooth',
                  })
                : window.scrollTo({
                    top: position,
                  });
              isRestored = true;
            }
          }
        } catch (e) {
          const scrollPos = parseInt(savedData, 10);
          if (!isNaN(scrollPos)) {
            scrollPos < 1300
              ? window.scrollTo({ top: scrollPos, behavior: 'smooth' })
              : window.scrollTo({ top: scrollPos });
            isRestored = true;
          }
        }
      }

      // Если данных нет или они просрочены — поднимаем страницу наверх
      if (!isRestored) {
        window.scrollTo({ top: 0 });
      }
    }

    setTimeout(() => {
      setWaitScroll(true);
    }, 1500);
  }, [results, pagePath]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 1) {
        const scrollData = {
          position: Math.round(window.scrollY),
          timestamp: Date.now(),
        };
        sessionStorage.setItem(pagePath, JSON.stringify(scrollData));
      }
    }, 300);

    if (waitScroll) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      setTimeout(() => sessionStorage.removeItem(pagePath), 1000 * 300);
    };
  }, [waitScroll, pagePath]);

  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(
          function () {
            if (Date.now() - lastRan >= limit) {
              func.apply(context, args);
              lastRan = Date.now();
            }
          },
          limit - (Date.now() - lastRan)
        );
      }
    };
  };

  return (
    <>
      <ul className={clsx(css.moviesList, 'fadeIn')}>
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
                <li key={item.id} className={`${css.moviesItem} fadeIn`}>
                  <Link
                    to={
                      link
                        ? `${link}/${item.id.toString()}`
                        : item.id.toString()
                    }
                    state={state}
                  >
                    {item.poster_path ? (
                      <Poster IMG_LINK={IMG_LINK} item={item} />
                    ) : (
                      <FaRegFileImage className={css.skeleton} />
                    )}
                    <div>
                      <p className={css.movieTitle}>{item.title}</p>
                      {item.release_date && (
                        <span className={css.movieTitleYear}>
                          {item.release_date.substring(0, 4)}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
      </ul>
    </>
  );
};

export default MovieList;
