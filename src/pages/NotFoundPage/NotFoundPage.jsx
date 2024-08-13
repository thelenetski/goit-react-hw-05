import BackLink from '../../components/BackLink/BackLink';
import css from './NotFoundPage.module.css';

const NotFound = () => {
  return (
    <div className={css.main}>
      <BackLink to={'/'}>Назад</BackLink>
      <h2>Oops... page not found</h2>
    </div>
  );
};

export default NotFound;
