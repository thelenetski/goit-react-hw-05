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
    <>
      {loading && <LoaderPoster />}
      <img
        className={clsx(className, loading && css.imageHide)}
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
      />
    </>
  );
};

export default Image;
