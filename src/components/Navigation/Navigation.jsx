import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';
import { IoMdHome } from 'react-icons/io';
import { RiMenuSearchFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPage,
  selectPagesNav,
  selectTotalPages,
} from '../../redux/selectors';
import { nextPage, prevPage } from '../../redux/moviesSlice';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
// import { changeItems } from '../../redux/moviesSlice';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const showPagesNav = useSelector(selectPagesNav);
  const totalPages = useSelector(selectTotalPages);

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <h1 className={css.title}>Movie DES</h1>
        <div className={css.linkBox}>
          <NavLink to="/home" className={buildLinkClass}>
            <IoMdHome />
            <span>Головна</span>
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            <RiMenuSearchFill />
            <span>Пошук</span>
          </NavLink>
          <NavLink to="/favorites" className={buildLinkClass}>
            <MdFavorite />
            <span>Обране</span>
          </NavLink>
          {showPagesNav && page > 1 && (
            <div className={css.navPage}>
              <button
                type="button"
                onClick={() => {
                  dispatch(prevPage());
                }}
              >
                <GrFormPrevious />
              </button>
            </div>
          )}
          {showPagesNav && page < totalPages && (
            <div className={css.navPage}>
              <button
                type="button"
                onClick={() => {
                  dispatch(nextPage());
                }}
              >
                <GrFormNext />
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
