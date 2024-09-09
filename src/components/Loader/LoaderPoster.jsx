import css from './LoaderPoster.module.css';

const LoaderPoster = () => {
  return (
    <div className={css.loaderPosterBox}>
      <span className={css.loader}></span>
    </div>
  );
};

export default LoaderPoster;
