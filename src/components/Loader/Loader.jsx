import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css['lds-facebook']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
