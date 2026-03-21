import { useState } from 'react';
import LoaderPoster from '../Loader/LoaderPoster';
import css from './Image.module.css';
import clsx from 'clsx';

const Image = ({ className, src, alt }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className={css.imageWrap}>
      {loading && <LoaderPoster />}
      <img
        className={clsx(
          className,
          css.image,
          'fadeIn',
          loading ? 'hide' : 'show'
        )}
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
      />
    </div>
  );
};

export default Image;
