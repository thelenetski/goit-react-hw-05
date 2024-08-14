import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <h1 className={css.title}>Movie DES</h1>
        <div>
          <NavLink to="/home" className={buildLinkClass}>
            Головна
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            Пошук
          </NavLink>
          <NavLink to="/favorites" className={buildLinkClass}>
            Обране
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
