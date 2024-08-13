import css from './FavButton.module.css';

const FavButton = ({ onAdd, children }) => {
  return (
    <>
      <button type="button" className={css.favbtn} onClick={onAdd}>
        {children}
      </button>
    </>
  );
};

export default FavButton;
