import { Tooltip } from 'react-tooltip';
import css from './Poster.module.css';
import clsx from 'clsx';
import { FaHeart } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa6';
import { useState } from 'react';
import LoaderPoster from '../../Loader/LoaderPoster';

const buildRateClass = rate => {
  return clsx(
    rate < 59 && 'rateBad',
    (rate < 70 && 'rateNorm') || (rate > 69 && 'rateNice')
  );
};

const Poster = ({ IMG_LINK, item }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className={css.posterWrap}>
      {loading && <LoaderPoster />}
      <>
        <img
          src={IMG_LINK + item.poster_path}
          alt={item.original_title}
          className={clsx(
            css.moviePoster,
            item.isWatch && css.moviePosterWatched,
            loading && css.moviePosterLoading
          )}
          onLoad={handleImageLoaded}
          loading="lazy"
        />

        {!loading && (
          <>
            <div className={css.iconsBox}>
              {item.vote_average !== 0 && item.vote_average && (
                <div className={css.rateBox}>
                  <FaStar
                    className={buildRateClass(
                      Math.round(item.vote_average * 10)
                    )}
                    data-tooltip-id="iconstooltip"
                    data-tooltip-content="Рейтинг"
                  />
                  <span>{parseFloat(item.vote_average.toFixed(1))}</span>
                </div>
              )}
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
