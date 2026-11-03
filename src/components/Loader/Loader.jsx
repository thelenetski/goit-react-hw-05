import clsx from 'clsx';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderWrap}>
      <div className={clsx(css['lds-facebook'], 'fadeIn')}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
