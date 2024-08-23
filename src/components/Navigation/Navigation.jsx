import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';
import { IoMdHome } from 'react-icons/io';
import { RiMenuSearchFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { changeItems } from '../../redux/moviesSlice';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  const dispatch = useDispatch();
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <h1 className={css.title}>Movie DES</h1>
        <div className={css.linkBox}>
          <NavLink to="/home" className={buildLinkClass}>
            <IoMdHome />
            <span>Головна</span>
          </NavLink>
          <NavLink
            to="/movies"
            className={buildLinkClass}
            onClick={dispatch(changeItems([]))}
          >
            <RiMenuSearchFill />
            <span>Пошук</span>
          </NavLink>
          <NavLink to="/favorites" className={buildLinkClass}>
            <MdFavorite />
            <span>Обране</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
