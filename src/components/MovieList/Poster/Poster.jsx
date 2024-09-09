import { Tooltip } from 'react-tooltip';
import css from './Poster.module.css';
import clsx from 'clsx';
import { FaHeart } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';
import { useState } from 'react';
import LoaderPoster from '../../Loader/LoaderPoster';

const Poster = ({ IMG_LINK, item }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading && <LoaderPoster />}
      <>
        <img
          src={IMG_LINK + item.poster_path}
          alt={item.original_title}
          className={clsx(
            css.moviePoster,
            item.isWatch && css.moviePosterWatched
          )}
          onLoad={handleImageLoaded}
          loading="lazy"
        />
        {!loading && (
          <>
            <div className={css.iconsBox}>
              {item.status && (
                <FaHeart
                  className={css.favHeart}
                  data-tooltip-id="iconstooltip"
                  data-tooltip-content="Обране"
                />
              )}
              {item.isWatch && (
                <IoEye
                  className={css.watch}
                  data-tooltip-id="iconstooltip"
                  data-tooltip-content="Переглянуто"
                />
              )}
            </div>
            <Tooltip
              id="iconstooltip"
              place="bottom"
              style={{
                backgroundColor: 'var(--color-link)',
                borderRadius: '10px',
              }}
            />
          </>
        )}
      </>
    </div>
  );
};

export default Poster;
