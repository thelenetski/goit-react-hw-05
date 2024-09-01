import css from './WatchButton.module.css';

const WatchButton = ({ onAdd, children }) => {
  return (
    <>
      <button type="button" className={css.watchbtn} onClick={onAdd}>
        {children}
      </button>
    </>
  );
};

export default WatchButton;
