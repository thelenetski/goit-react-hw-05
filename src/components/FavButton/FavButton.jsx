import css from './FavButton.module.css';

const FavButton = ({ onAdd }) => {
  return (
    <>
      <button type="button" className={css.favbtn} onClick={onAdd}>
        Додати
      </button>
    </>
  );
};

export default FavButton;
